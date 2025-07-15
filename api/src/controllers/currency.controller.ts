import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Conversion } from '../interfaces/conversion';
import { httpClient } from '../configs/http-client';

let conversions: Conversion[] = [];

export const getCurrencies = async (req: Request, res: Response) => {
  try {
    const response = await httpClient.get(`/currencies`);
    console.log('res', response.data.data);
    res.json(response.data.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch currencies' });
  }
};

export const convertCurrency = async (req: Request, res: Response) => {
  const { from, to, amount } = req.body;
  try {
    const response = await httpClient.get('/latest', {
        params: {
            base_currency: from,
            currencies: to,
        }
    });
    
    const rate = response.data.data[to];
    const result = amount * rate;
    
    const conversion: Conversion = {
      id: uuidv4(),
      fromCurrency: from,
      toCurrency: to,
      amount,
      result,
      date: new Date().toISOString()
    };
    
    conversions.push(conversion);
    res.json({ result, conversion });
  } catch (error) {
    res.status(500).json({ error: 'Conversion failed' });
  }
};

export const getConversions = (req: Request, res: Response) => {
  res.json(conversions);
};