import express from "express";
import path from "path";
const __dirname = process.cwd();


const router = express.Router();

// Ruta principal para la página estática
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './views/index.html'));
});

// Ruta para la página del logo
router.get('/logo.html', (req, res) => {
  res.sendFile(path.join(__dirname, './views/logo.html'));
});

router.get('/font.html', (req, res) => {
  res.sendFile(path.join(__dirname, './views/font.html'));
});

router.get('/color.html', (req, res) => {
  res.sendFile(path.join(__dirname, './views/color.html'));
});

router.get('/mascota.html', (req, res) => {
  res.sendFile(path.join(__dirname, './views/mascota.html'));
});

router.get('/fundacion.html', (req, res) => {
  res.sendFile(path.join(__dirname, './views/fundacion.html'));
});


export default router;
