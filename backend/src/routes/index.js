import { Router } from 'express';
const router = Router();

//Raiz
router.get('/', (req, res) => {    
    res.json(
        {
            "Title": "Bienvenido"
        }
    );
});
 
export default router;