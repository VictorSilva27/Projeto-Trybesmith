import express from 'express';
import httpErrorMiddleware from './middlewares/http.error.middleware';
import productRouter from './routes/product.routes';
import userRouter from './routes/user.routes';
import loginRouter from './routes/login.routes';
import orderLogin from './routes/order.routes';

const app = express();

app.use(express.json());

app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/orders', orderLogin);

app.use(httpErrorMiddleware);

export default app;
