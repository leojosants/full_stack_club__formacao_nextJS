interface HttpStatusCodeInterface {
    notFound: number;
    created: number;
    ok: number;
};

export const httpStatusCode: HttpStatusCodeInterface = {
    notFound: 404,
    created: 201,
    ok: 200,
};