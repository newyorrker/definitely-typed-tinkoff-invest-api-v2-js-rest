import type { MoneyValue } from "../contracts/common";
import type {
  GetAccountsResponse,
  GetAccountsRequest,
} from "../contracts/users";
import type {
  PostOrderResponse,
  GetOrdersResponse,
  CancelOrderResponse,
  OrderState,
  PostOrderRequest,
  ReplaceOrderRequest,
  GetOrdersRequest,
  CancelOrderRequest,
  GetOrderStateRequest,
} from "../contracts/orders";
import type {
  PositionsResponse,
  OperationsResponse,
  GetOperationsByCursorResponse,
  PortfolioResponse,
  WithdrawLimitsResponse,
  PositionsRequest,
  OperationsRequest,
  GetOperationsByCursorRequest,
  PortfolioRequest,
  WithdrawLimitsRequest,
} from "../contracts/operations";

/** Запрос открытия счёта в песочнице. */
export interface OpenSandboxAccountRequest {}

/** Номер открытого счёта в песочнице. */
export interface OpenSandboxAccountResponse {
  /** Номер счёта */
  accountId: string;
}

/** Запрос закрытия счёта в песочнице. */
export interface CloseSandboxAccountRequest {
  /** Номер счёта */
  accountId: string;
}

/** Результат закрытия счёта в песочнице. */
export interface CloseSandboxAccountResponse {}

/** Запрос пополнения счёта в песочнице. */
export interface SandboxPayInRequest {
  /** Номер счёта */
  accountId: string;
  /** Сумма пополнения счёта в рублях */
  amount: MoneyValue | undefined;
}

/** Результат пополнения счёта, текущий баланс. */
export interface SandboxPayInResponse {
  /** Текущий баланс счёта */
  balance: MoneyValue | undefined;
}

/** Сервис для работы с песочницей TINKOFF INVEST API */
export interface SandboxService {
  /** Метод регистрации счёта в песочнице. */
  OpenSandboxAccount(
    request: OpenSandboxAccountRequest
  ): Promise<OpenSandboxAccountResponse>;
  /** Метод получения счетов в песочнице. */
  GetSandboxAccounts(request: GetAccountsRequest): Promise<GetAccountsResponse>;
  /** Метод закрытия счёта в песочнице. */
  CloseSandboxAccount(
    request: CloseSandboxAccountRequest
  ): Promise<CloseSandboxAccountResponse>;
  /** Метод выставления торгового поручения в песочнице. */
  PostSandboxOrder(request: PostOrderRequest): Promise<PostOrderResponse>;
  /** Метод изменения выставленной заявки. */
  ReplaceSandboxOrder(request: ReplaceOrderRequest): Promise<PostOrderResponse>;
  /** Метод получения списка активных заявок по счёту в песочнице. */
  GetSandboxOrders(request: GetOrdersRequest): Promise<GetOrdersResponse>;
  /** Метод отмены торгового поручения в песочнице. */
  CancelSandboxOrder(request: CancelOrderRequest): Promise<CancelOrderResponse>;
  /** Метод получения статуса заявки в песочнице. Заявки хранятся в таблице 7 дней. */
  GetSandboxOrderState(request: GetOrderStateRequest): Promise<OrderState>;
  /** Метод получения позиций по виртуальному счёту песочницы. */
  GetSandboxPositions(request: PositionsRequest): Promise<PositionsResponse>;
  /** Метод получения операций в песочнице по номеру счёта. */
  GetSandboxOperations(request: OperationsRequest): Promise<OperationsResponse>;
  /** Метод получения операций в песочнице по номеру счета с пагинацией. */
  GetSandboxOperationsByCursor(
    request: GetOperationsByCursorRequest
  ): Promise<GetOperationsByCursorResponse>;
  /** Метод получения портфолио в песочнице. */
  GetSandboxPortfolio(request: PortfolioRequest): Promise<PortfolioResponse>;
  /** Метод пополнения счёта в песочнице. */
  SandboxPayIn(request: SandboxPayInRequest): Promise<SandboxPayInResponse>;
  /** Метод получения доступного остатка для вывода средств в песочнице. */
  GetSandboxWithdrawLimits(
    request: WithdrawLimitsRequest
  ): Promise<WithdrawLimitsResponse>;
}
