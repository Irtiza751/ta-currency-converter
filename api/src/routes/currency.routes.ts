import { Router } from 'express';
import { getCurrencies, convertCurrency, getConversions } from '../controllers/currency.controller';

const router = Router();

router.get('/currencies', getCurrencies);
router.post('/convert', convertCurrency);
router.get('/conversions', getConversions);

export default router;