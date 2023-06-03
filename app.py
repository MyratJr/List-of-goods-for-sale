from fastapi import FastAPI, HTTPException,status
from tortoise.contrib.fastapi import register_tortoise
from models import*

# adding cors
from fastapi.middleware.cors import CORSMiddleware

# email
from fastapi import BackgroundTasks, UploadFile, File, Form
from starlette.responses import JSONResponse
from starlette.requests import Request
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from pydantic import BaseModel, EmailStr
from typing import List


# for env
from dotenv import dotenv_values

# credentials
credentials=dict(dotenv_values('.env'))

# adding cors headers
from fastapi.middleware.cors import CORSMiddleware

app=FastAPI()

# adding cors urls
origins=[
    'http://localhost:3000'
]

# addmiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)


@app.get('/')
async def index():
    return {'Msg':'go to /docs for the API documentation'}


@app.post('/supplier')
async def create_supplier(supplier_info:supplier_pydanticIn):
    supplier_obj=await Supplier.create(**supplier_info.dict(exclude_unset=True))
    response=await supplier_pydantic.from_tortoise_orm(supplier_obj)
    return {'status':'ok','data':supplier_obj}


@app.get('/supplier')
async def get_all_suppliers():
    response=await supplier_pydantic.from_queryset(Supplier.all())
    return {"status":"ok",'data':response}


@app.get('/supplier/{id}')
async def get_specific_supplier(id:int):
    try:
        supplier=await Supplier.get(id=id)
    except:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail='Supplier Not Found!')
    return supplier


@app.put('/supplier/{id}')
async def update_supplier(id:int,update_info:supplier_pydanticIn):
    try:
        supplier=await Supplier.get(id=id)
    except:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail='Supplier Not Found!')
    update_info=update_info.dict(exclude_unset=True)
    for obj in update_info:
        setattr(supplier,obj,update_info[obj])
    await supplier.save()
    response=await supplier_pydantic.from_tortoise_orm(supplier)
    return {'status':'ok','data':response}


@app.post('/product/{id}')
async def add_product(id:int,product:product_pydanticIn):
    supplier=await Supplier.get(id=id)
    product=product.dict(exclude_unset=True)
    product['revenue']+=product['quantity_sold']*product['unit_price']
    product_obj=await Product.create(**product,supplied_by=supplier)
    response=await product_pydantic.from_tortoise_orm(product_obj)
    return {'status':'ok', "data":response}

@app.get('/products')
async def get_products():
    products=await Product.all()
    return {'status':'ok','data':products}


@app.get('/product/{id}')
async def get_product(id:int):
    product=await product_pydantic.from_queryset_single(Product.get(id=id))
    return {'status':'ok','data':product}


@app.put('/product/{id}')
async def update_product(id:int, update_info:product_pydanticIn):
    product=await Product.get(id=id)
    update_info=update_info.dict(exclude_unset=True)
    product.name=update_info['name']
    product.quantity_in_stock=update_info['quantity_in_stock']
    product.revenue+=update_info['quantity_sold']*update_info['unit_price']
    product.quantity_sold+=update_info['quantity_sold']
    product.unit_price=update_info['unit_price']
    await product.save()
    response=await product_pydantic.from_tortoise_orm(product)
    return {'status':'ok','data':product}
    
@app.delete('/delete_product/{id}')
async def delete_product(id:int):
    await Product.get(id=id).delete()
    return {'status':'ok'}

@app.delete('/delete/{id}')
async def delete_supplier(id:int):
    await Supplier.get(id=id).delete()
    return {'status':'ok'}

class EmailSchema(BaseModel):
    email: List[EmailStr]

class EmailContent(BaseModel):
    message:str
    subject:str

conf = ConnectionConfig(
    MAIL_USERNAME =credentials['EMAIL'],
    MAIL_PASSWORD = credentials['PASS'],
    MAIL_FROM = credentials['EMAIL'],
    MAIL_PORT = 465,
    MAIL_SERVER = "smtp.gmail.com",
    MAIL_STARTTLS = False,
    MAIL_SSL_TLS = True,    
    USE_CREDENTIALS = True,
    VALIDATE_CERTS = True
)

@app.post('/email/{product_id}')
async def send_email(product_id:int,content:EmailContent):
    product=await Product.get(id=product_id)
    supplier=await product.supplied_by
    supplier_email=[supplier.email]
    html = """
    <h5>Thanks for using Fastapi-mail</h5>
    <br>
    <p>{content.message}</p>
    <br>
    <h6>Best Regars</h6>
    <h6>John Business LTD</h6> 
    """

    message = MessageSchema(
        subject=content.subject,
        recipients=supplier_email,
        body=html,
        subtype='html')
    
    fm = FastMail(conf)
    await fm.send_message(message)
    return {'status':'ok'}

register_tortoise(
    app,
    db_url="postgres://postgres:63365663@localhost/new",
    modules={"models":["models"]},
    generate_schemas=True,
    add_exception_handlers=True
)