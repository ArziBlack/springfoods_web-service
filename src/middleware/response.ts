import { Request, Response, NextFunction } from 'express';

interface CustomResponseFormat {
  message: string;
  status: number;
  data?: any;
}