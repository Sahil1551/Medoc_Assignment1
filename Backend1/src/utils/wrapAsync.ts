import { Request, Response, NextFunction } from 'express';

export const wrapAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next); // Pass any errors to the next error handler
  };
};
