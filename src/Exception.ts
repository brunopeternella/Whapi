export class Exception extends Error{    
    type: string;
    status: number;

    constructor(type: string, message: string, status: number){
        super(message);
        this.type = type;
        this.status = status;
    }

    public ExceptionResponse(error: any, res: any): void{
        if(error instanceof Exception){
            return res.status(error.status).json({
                type: error.type,
                message: error.message,
                status: error.status
            });
        }

        var exception = new Exception(this.type, error.message, 500);

        return res.status(exception.status).json({
            type: exception.type,
            message: exception.message,
            status: exception.status
        })
    }
}