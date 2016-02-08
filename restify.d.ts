// Type definitions for node.js REST framework 2.0
// Project: https://github.com/mcavage/node-restify
// Definitions by: Bret Little <https://github.com/blittle>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

import http = require('http');

declare namespace restify {

    interface addressInterface {
        port: number;
        family: string;
        address: string;
    }

    interface requestFileInterface {
        path: string;
        type: string;
    }

    /**
     * Comes from authorizationParser plugin
     */
    interface requestAuthorization {
        scheme: string;
        credentials: string;
        basic?: {
            username: string;
            password: string;
        };
    }

    interface Request extends http.ServerRequest {
        /** Added by Hyperfish for their own stuff */
        jwt: any;
        header: (key: string, defaultValue?: string) => any;
        accepts: (type: string) => boolean;
        is: (type: string) => boolean;
        getLogger: (component: string) => any;
        contentLength: number;
        contentType: string;
        href: () => string;
        log: any;
        id: string;
        path: () => string;
        query: any;
        secure: boolean;
        time: number;
        params: any;
        files?: { [name: string]: requestFileInterface };
        isSecure: () => boolean;
        /** available when bodyParser plugin is used */
        body?: any;
        /** available when authorizationParser plugin is used */
        username?: string;
        /** available when authorizationParser plugin is used */
        authorization?: requestAuthorization;
    }

    interface Response extends http.ServerResponse {
        header: (key: string, value?: any) => any;
        cache: (type?: any, options?: Object) => any;
        status: (code: number) => any;
        send: (status?: any, body?: any, headers?: { [header: string]: string }) => any;
        json: (status?: any, body?: any, headers?: { [header: string]: string }) => any;
        code: number;
        contentLength: number;
        charSet(value: string): void;
        contentType: string;
        headers: Object;
        id: string;
    }

    interface Route {
        name: string;
        method: string;
        path: RoutePathRegex;
        spec: Object;
        types: string[];
        versions: string[];
    }

    interface RouteOptions {
        name: string;
        method: string;
        path?: string | RegExp;
        url?: string | RegExp;
        urlParamPattern?: RegExp;
        contentType?: string | string[];
        versions?: string | string[];
    }

    interface RoutePathRegex extends RegExp {
        restifyParams: string[];
    }

    interface Router {
        name: string;
        mounts: { [routeName: string]: Route };
        versions: string[];
        contentType: string[];
        routes: {
            DELETE: Route[];
            GET: Route[];
            HEAD: Route[];
            OPTIONS: Route[];
            PATCH: Route[];
            POST: Route[];
            PUT: Route[];
        };
        log?: any;
        toString: () => string;

        /**
         * Takes an object of route params and query params, and 'renders' a URL
         * @param    {String} routeName the route name
         * @param    {Object} params    an object of route params
         * @param    {Object} query     an object of query params
         * @returns  {String}
         */
        render: (routeName: string, params: Object, query?: Object) => string;

        /**
         * adds a route.
         * @param    {Object} options an options object
         * @returns  {String}         returns the route name if creation is successful.
         */
        mount: (options: Object) => string;

        /**
         * unmounts a route.
         * @param    {String} name the route name
         * @returns  {String}      the name of the deleted route (or false if it was not matched)
         */
        unmount: (name: string) => string | boolean;
    }

    interface Server extends http.Server {
        use(handler: RequestHandler, ...handlers: RequestHandler[]): Server;
        use(handler: RequestHandler[], ...handlers: RequestHandler[]): Server;
        use(handler: RequestHandler, ...handlers: RequestHandler[][]): Server;
        use(handler: RequestHandler[], ...handlers: RequestHandler[][]): Server;

        post(route: any, routeCallBack: RequestHandler, ...routeCallBacks: RequestHandler[]): Route;
        post(route: any, routeCallBack: RequestHandler[], ...routeCallBacks: RequestHandler[]): Route;
        post(route: any, routeCallBack: RequestHandler, ...routeCallBacks: RequestHandler[][]): Route;
        post(route: any, routeCallBack: RequestHandler[], ...routeCallBacks: RequestHandler[][]): Route;

        patch(route: any, routeCallBack: RequestHandler, ...routeCallBacks: RequestHandler[]): Route;
        patch(route: any, routeCallBack: RequestHandler[], ...routeCallBacks: RequestHandler[]): Route;
        patch(route: any, routeCallBack: RequestHandler, ...routeCallBacks: RequestHandler[][]): Route;
        patch(route: any, routeCallBack: RequestHandler[], ...routeCallBacks: RequestHandler[][]): Route;

        put(route: any, routeCallBack: RequestHandler, ...routeCallBacks: RequestHandler[]): Route;
        put(route: any, routeCallBack: RequestHandler[], ...routeCallBacks: RequestHandler[]): Route;
        put(route: any, routeCallBack: RequestHandler, ...routeCallBacks: RequestHandler[][]): Route;
        put(route: any, routeCallBack: RequestHandler[], ...routeCallBacks: RequestHandler[][]): Route;

        del(route: any, routeCallBack: RequestHandler, ...routeCallBacks: RequestHandler[]): Route;
        del(route: any, routeCallBack: RequestHandler[], ...routeCallBacks: RequestHandler[]): Route;
        del(route: any, routeCallBack: RequestHandler, ...routeCallBacks: RequestHandler[][]): Route;
        del(route: any, routeCallBack: RequestHandler[], ...routeCallBacks: RequestHandler[][]): Route;

        get(route: any, routeCallBack: RequestHandler, ...routeCallBacks: RequestHandler[]): Route;
        get(route: any, routeCallBack: RequestHandler[], ...routeCallBacks: RequestHandler[]): Route;
        get(route: any, routeCallBack: RequestHandler, ...routeCallBacks: RequestHandler[][]): Route;
        get(route: any, routeCallBack: RequestHandler[], ...routeCallBacks: RequestHandler[][]): Route;

        head(route: any, routeCallBack: RequestHandler, ...routeCallBacks: RequestHandler[]): Route;
        head(route: any, routeCallBack: RequestHandler[], ...routeCallBacks: RequestHandler[]): Route;
        head(route: any, routeCallBack: RequestHandler, ...routeCallBacks: RequestHandler[][]): Route;
        head(route: any, routeCallBack: RequestHandler[], ...routeCallBacks: RequestHandler[][]): Route;

        opts(route: any, routeCallBack: RequestHandler, ...routeCallBacks: RequestHandler[]): Route;
        opts(route: any, routeCallBack: RequestHandler[], ...routeCallBacks: RequestHandler[]): Route;
        opts(route: any, routeCallBack: RequestHandler, ...routeCallBacks: RequestHandler[][]): Route;
        opts(route: any, routeCallBack: RequestHandler[], ...routeCallBacks: RequestHandler[][]): Route;

        name: string;
        version: string;
        log: Object;
        acceptable: string[];
        url: string;
        address: () => addressInterface;
        listen(...args: any[]): any;
        close(...args: any[]): any;
        pre(routeCallBack: RequestHandler): Server;
        server: http.Server;
        router: Router;
        routes: Route[];
        toString: () => string;
    }

    interface ServerOptions {
        certificate?: string;
        key?: string;
        formatters?: Object;
        log?: Object;
        name?: string;
        spdy?: Object;
        version?: string;
        responseTimeHeader?: string;
        responseTimeFormatter?: (durationInMilliseconds: number) => any;
        handleUpgrades?: boolean;
        router?: Router;
    }

    interface ClientOptions {
        accept?: string;
        connectTimeout?: number;
        dtrace?: Object;
        gzip?: Object;
        headers?: Object;
        log?: Object;
        retry?: Object;
        signRequest?: Function;
        url?: string;
        userAgent?: string;
        version?: string;
    }

    interface Client {
        get: (path: string, callback?: (err: any, req: Request, res: Response, obj: any) => any) => any;
        head: (path: string, callback?: (err: any, req: Request, res: Response) => any) => any;
        post: (path: string, object: any, callback?: (err: any, req: Request, res: Response, obj: any) => any) => any;
        put: (path: string, object: any, callback?: (err: any, req: Request, res: Response, obj: any) => any) => any;
        del: (path: string, callback?: (err: any, req: Request, res: Response) => any) => any;
        basicAuth: (username: string, password: string) => any;
    }

    interface HttpClient extends Client {
        get: (path?: any, callback?: Function) => any;
        head: (path?: any, callback?: Function) => any;
        post: (opts?: any, callback?: Function) => any;
        put: (opts?: any, callback?: Function) => any;
        del: (opts?: any, callback?: Function) => any;
    }

    interface ThrottleOptions {
        burst?: number;
        rate?: number;
        ip?: boolean;
        xff?: boolean;
        username?: boolean;
        tokensTable?: Object;
        maxKeys?: number;
        overrides?: Object;
    }

    interface Next {
        (err?: any): any;
        ifError: (err?: any) => any;
    }

    interface RequestHandler {
        (req: Request, res: Response, next: Next): any;
    }

    interface CORS {
        (cors?: {
            origins?: string[];
            credentials?: boolean;
            headers?: string[];
        }): RequestHandler;
        origins: string[];
        ALLOW_HEADERS: string[];
        credentials: boolean;
    }

    export function createServer(options?: ServerOptions): Server;

    export function createJsonClient(options?: ClientOptions): Client;
    export function createStringClient(options?: ClientOptions): Client;
    export function createClient(options?: ClientOptions): HttpClient;

    export class HttpError { constructor(cause: any, message?: any); }

    class DefiniteHttpError {
        constructor(message?: any);
        constructor(cause: any, message?: any);
    }

    class BadRequestError extends DefiniteHttpError { }
    class UnauthorizedError extends DefiniteHttpError { }
    class PaymentRequiredError extends DefiniteHttpError { }
    class ForbiddenError extends DefiniteHttpError { }
    class NotFoundError extends DefiniteHttpError { }
    class MethodNotAllowedError extends DefiniteHttpError { }
    class NotAcceptableError extends DefiniteHttpError { }
    class ProxyAuthenticationRequiredError extends DefiniteHttpError { }
    class RequestTimeoutError extends DefiniteHttpError { }
    class ConflictError extends DefiniteHttpError { }
    class GoneError extends DefiniteHttpError { }
    class LengthRequiredError extends DefiniteHttpError { }
    class RequestEntityTooLargeError extends DefiniteHttpError { }
    class RequesturiTooLargeError extends DefiniteHttpError { }
    class UnsupportedMediaTypeError extends DefiniteHttpError { }
    class RequestedRangeNotSatisfiableError extends DefiniteHttpError { }
    class ExpectationFailedError extends DefiniteHttpError { }
    class ImATeapotError extends DefiniteHttpError { }
    class UnprocessableEntityError extends DefiniteHttpError { }
    class LockedError extends DefiniteHttpError { }
    class FailedDependencyError extends DefiniteHttpError { }
    class UnorderedCollectionError extends DefiniteHttpError { }
    class UpgradeRequiredError extends DefiniteHttpError { }
    class PreconditionRequiredError extends DefiniteHttpError { }
    class TooManyRequestsError extends DefiniteHttpError { }
    class RequestHeaderFieldsTooLargeError extends DefiniteHttpError { }
    class InternalServerError extends DefiniteHttpError { }
    class NotImplementedError extends DefiniteHttpError { }
    class BadGatewayError extends DefiniteHttpError { }
    class ServiceUnavailableError extends DefiniteHttpError { }
    class GatewayTimeoutError extends DefiniteHttpError { }
    class HttpVersionNotSupportedError extends DefiniteHttpError { }
    class VariantAlsoNegotiatesError extends DefiniteHttpError { }
    class InsufficientStorageError extends DefiniteHttpError { }
    class BandwidthLimitExceededError extends DefiniteHttpError { }
    class NotExtendedError extends DefiniteHttpError { }
    class NetworkAuthenticationRequiredError extends DefiniteHttpError { }
    class RestError extends DefiniteHttpError { }

    class PreconditionFailedError extends RestError { }
    class BadDigestError extends RestError { }
    class BadMethodError extends RestError { }
    class InternalError extends RestError { }
    class InvalidArgumentError extends RestError { }
    class InvalidContentError extends RestError { }
    class InvalidCredentialsError extends RestError { }
    class InvalidHeaderError extends RestError { }
    class InvalidVersionError extends RestError { }
    class MissingParameterError extends RestError { }
    class NotAuthorizedError extends RestError { }
    class RequestExpiredError extends RestError { }
    class RequestThrottledError extends RestError { }
    class ResourceNotFoundError extends RestError { }
    class WrongAcceptError extends RestError { }


    export function acceptParser(parser: any): RequestHandler;
    export function authorizationParser(): RequestHandler;
    export function dateParser(skew?: number): RequestHandler;
    export function queryParser(options?: Object): RequestHandler;
    export function urlEncodedBodyParser(options?: Object): RequestHandler[];
    export function jsonp(): RequestHandler;
    export function gzipResponse(options?: Object): RequestHandler;
    export function bodyParser(options?: Object): RequestHandler[];
    export function requestLogger(options?: Object): RequestHandler;
    export function serveStatic(options?: Object): RequestHandler;
    export function throttle(options?: ThrottleOptions): RequestHandler;
    export function conditionalRequest(): RequestHandler[];
    export function auditLogger(options?: Object): Function;
    export function fullResponse(): RequestHandler;
    export var defaultResponseHeaders: any;
    export var CORS: CORS;

    export module pre {
        export function pause(): RequestHandler;
        export function sanitizePath(options?: any): RequestHandler;
        export function userAgentConnection(options?: any): RequestHandler;
    }
}

export = restify;
