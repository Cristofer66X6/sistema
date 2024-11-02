import express from "express";
import path from "path";
import moduler from 'sio-moduler';
import indexRouter from "./routes/index.js";
const app = express();
const __dirname = process.cwd();


app.use('/modules', moduler(['sioelement']));
// Configuración para archivos estáticos (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// Configurar puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
