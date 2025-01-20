import { NextFunction, Request, Response } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import authService from "./auth.service";

class AuthController {
  public async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = await authService.register(req.body);
      res.status(StatusCodes.CREATED).json({
        data: user,
        message: getReasonPhrase(StatusCodes.CREATED),
      });
    } catch (err: unknown) {
      if (err instanceof Error && err.message === "Email already in use") {
        res.status(StatusCodes.CONFLICT).json({
          message: err.message,
        });
        return;
      }
      next(err);
    }
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await authService.login(email, password);
      res.status(StatusCodes.OK).json({
        token,
        message: getReasonPhrase(StatusCodes.OK),
      });
    } catch (err: unknown) {
      if (err instanceof Error && err.message === "Invalid email or password") {
        res.status(StatusCodes.UNAUTHORIZED).json({
          message: err.message,
        });
        return;
      }
      next(err);
    }
  }
}

export default new AuthController();
