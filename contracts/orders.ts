import { Observable } from "../Observable";
import type { Ping, Quotation, MoneyValue } from "../contracts/common";

/** Направление операции. */
export enum OrderDirection {
  /** ORDER_DIRECTION_UNSPECIFIED - Значение не указано */
  ORDER_DIRECTION_UNSPECIFIED = "ORDER_DIRECTION_UNSPECIFIED",
  /** ORDER_DIRECTION_BUY - Покупка */
  ORDER_DIRECTION_BUY = "ORDER_DIRECTION_BUY",
  /** ORDER_DIRECTION_SELL - Продажа */
  ORDER_DIRECTION_SELL = "ORDER_DIRECTION_SELL",
  UNRECOGNIZED = "UNRECOGNIZED",
}

/** Тип заявки. */
export enum OrderType {
  /** ORDER_TYPE_UNSPECIFIED - Значение не указано */
  ORDER_TYPE_UNSPECIFIED = "ORDER_TYPE_UNSPECIFIED",
  /** ORDER_TYPE_LIMIT - Лимитная */
  ORDER_TYPE_LIMIT = "ORDER_TYPE_LIMIT",
  /** ORDER_TYPE_MARKET - Рыночная */
  ORDER_TYPE_MARKET = "ORDER_TYPE_MARKET",
  /** ORDER_TYPE_BESTPRICE - Лучшая цена */
  ORDER_TYPE_BESTPRICE = "ORDER_TYPE_BESTPRICE",
  UNRECOGNIZED = "UNRECOGNIZED",
}

/** Текущий статус заявки (поручения) */
export enum OrderExecutionReportStatus {
  EXECUTION_REPORT_STATUS_UNSPECIFIED = "EXECUTION_REPORT_STATUS_UNSPECIFIED",
  /** EXECUTION_REPORT_STATUS_FILL - Исполнена */
  EXECUTION_REPORT_STATUS_FILL = "EXECUTION_REPORT_STATUS_FILL",
  /** EXECUTION_REPORT_STATUS_REJECTED - Отклонена */
  EXECUTION_REPORT_STATUS_REJECTED = "EXECUTION_REPORT_STATUS_REJECTED",
  /** EXECUTION_REPORT_STATUS_CANCELLED - Отменена пользователем */
  EXECUTION_REPORT_STATUS_CANCELLED = "EXECUTION_REPORT_STATUS_CANCELLED",
  /** EXECUTION_REPORT_STATUS_NEW - Новая */
  EXECUTION_REPORT_STATUS_NEW = "EXECUTION_REPORT_STATUS_NEW",
  /** EXECUTION_REPORT_STATUS_PARTIALLYFILL - Частично исполнена */
  EXECUTION_REPORT_STATUS_PARTIALLYFILL = "EXECUTION_REPORT_STATUS_PARTIALLYFILL",
  UNRECOGNIZED = "UNRECOGNIZED",
}

/** Тип цены. */
export enum PriceType {
  /** PRICE_TYPE_UNSPECIFIED - Значение не определено. */
  PRICE_TYPE_UNSPECIFIED = "PRICE_TYPE_UNSPECIFIED",
  /** PRICE_TYPE_POINT - Цена в пунктах (только для фьючерсов и облигаций). */
  PRICE_TYPE_POINT = "PRICE_TYPE_POINT",
  /** PRICE_TYPE_CURRENCY - Цена в валюте расчётов по инструменту. */
  PRICE_TYPE_CURRENCY = "PRICE_TYPE_CURRENCY",
  UNRECOGNIZED = "UNRECOGNIZED",
}

/** Запрос установки соединения. */
export interface TradesStreamRequest {
  /** Идентификаторы счетов. */
  accounts: string[];
}

/** Информация о торговых поручениях. */
export interface TradesStreamResponse {
  /** Информация об исполнении торгового поручения. */
  orderTrades: OrderTrades | undefined;
  /** Проверка активности стрима. */
  ping: Ping | undefined;
}

/** Информация об исполнении торгового поручения. */
export interface OrderTrades {
  /** Идентификатор торгового поручения. */
  orderId: string;
  /** Дата и время создания сообщения в часовом поясе UTC. */
  createdAt: Date | undefined;
  /** Направление сделки. */
  direction: OrderDirection;
  /** Figi-идентификатор инструмента. */
  figi: string;
  /** Массив сделок. */
  trades: OrderTrade[];
  /** Идентификатор счёта. */
  accountId: string;
  /** UID идентификатор инструмента. */
  instrumentUid: string;
}

/** Информация о сделке. */
export interface OrderTrade {
  /** Дата и время совершения сделки в часовом поясе UTC. */
  dateTime: Date | undefined;
  /** Цена за 1 инструмент, по которой совершена сделка. */
  price: Quotation | undefined;
  /** Количество штук в сделке. */
  quantity: number;
  /** Идентификатор сделки. */
  tradeId: string;
}

/** Запрос выставления торгового поручения. */
export interface PostOrderRequest {
  /**
   * Deprecated Figi-идентификатор инструмента. Необходимо использовать instrument_id.
   *
   * @deprecated
   */
  figi: string;
  /** Количество лотов. */
  quantity: number;
  /** Цена за 1 инструмент. Для получения стоимости лота требуется умножить на лотность инструмента. Игнорируется для рыночных поручений. */
  price: Quotation | undefined;
  /** Направление операции. */
  direction: OrderDirection;
  /** Номер счёта. */
  accountId: string;
  /** Тип заявки. */
  orderType: OrderType;
  /** Идентификатор запроса выставления поручения для целей идемпотентности в формате UID. Максимальная длина 36 символов. */
  orderId: string;
  /** Идентификатор инструмента, принимает значения Figi или Instrument_uid. */
  instrumentId: string;
}

/** Информация о выставлении поручения. */
export interface PostOrderResponse {
  /** Биржевой идентификатор заявки. */
  orderId: string;
  /** Текущий статус заявки. */
  executionReportStatus: OrderExecutionReportStatus;
  /** Запрошено лотов. */
  lotsRequested: number;
  /** Исполнено лотов. */
  lotsExecuted: number;
  /** Начальная цена заявки. Произведение количества запрошенных лотов на цену. */
  initialOrderPrice: MoneyValue | undefined;
  /** Исполненная средняя цена 1 одного инструмента в заявки. */
  executedOrderPrice: MoneyValue | undefined;
  /** Итоговая стоимость заявки, включающая все комиссии. */
  totalOrderAmount: MoneyValue | undefined;
  /** Начальная комиссия. Комиссия рассчитанная при выставлении заявки. */
  initialCommission: MoneyValue | undefined;
  /** Фактическая комиссия по итогам исполнения заявки. */
  executedCommission: MoneyValue | undefined;
  /** Значение НКД (накопленного купонного дохода) на дату. Подробнее: [НКД при выставлении торговых поручений](https://tinkoff.github.io/investAPI/head-orders#coupon) */
  aciValue: MoneyValue | undefined;
  /** Figi-идентификатор инструмента. */
  figi: string;
  /** Направление сделки. */
  direction: OrderDirection;
  /** Начальная цена за 1 инструмент. Для получения стоимости лота требуется умножить на лотность инструмента. */
  initialSecurityPrice: MoneyValue | undefined;
  /** Тип заявки. */
  orderType: OrderType;
  /** Дополнительные данные об исполнении заявки. */
  message: string;
  /** Начальная цена заявки в пунктах (для фьючерсов). */
  initialOrderPricePt: Quotation | undefined;
  /** UID идентификатор инструмента. */
  instrumentUid: string;
}

/** Запрос отмены торгового поручения. */
export interface CancelOrderRequest {
  /** Номер счёта. */
  accountId: string;
  /** Идентификатор заявки. */
  orderId: string;
}

/** Результат отмены торгового поручения. */
export interface CancelOrderResponse {
  /** Дата и время отмены заявки в часовом поясе UTC. */
  time: Date | undefined;
}

/** Запрос получения статуса торгового поручения. */
export interface GetOrderStateRequest {
  /** Номер счёта. */
  accountId: string;
  /** Идентификатор заявки. */
  orderId: string;
}

/** Запрос получения списка активных торговых поручений. */
export interface GetOrdersRequest {
  /** Номер счёта. */
  accountId: string;
}

/** Список активных торговых поручений. */
export interface GetOrdersResponse {
  /** Массив активных заявок. */
  orders: OrderState[];
}

/** Информация о торговом поручении. */
export interface OrderState {
  /** Биржевой идентификатор заявки. */
  orderId: string;
  /** Текущий статус заявки. */
  executionReportStatus: OrderExecutionReportStatus;
  /** Запрошено лотов. */
  lotsRequested: number;
  /** Исполнено лотов. */
  lotsExecuted: number;
  /** Начальная цена заявки. Произведение количества запрошенных лотов на цену. */
  initialOrderPrice: MoneyValue | undefined;
  /** Исполненная цена заявки. Произведение средней цены покупки на количество лотов. */
  executedOrderPrice: MoneyValue | undefined;
  /** Итоговая стоимость заявки, включающая все комиссии. */
  totalOrderAmount: MoneyValue | undefined;
  /** Средняя цена позиции по сделке. */
  averagePositionPrice: MoneyValue | undefined;
  /** Начальная комиссия. Комиссия, рассчитанная на момент подачи заявки. */
  initialCommission: MoneyValue | undefined;
  /** Фактическая комиссия по итогам исполнения заявки. */
  executedCommission: MoneyValue | undefined;
  /** Figi-идентификатор инструмента. */
  figi: string;
  /** Направление заявки. */
  direction: OrderDirection;
  /** Начальная цена за 1 инструмент. Для получения стоимости лота требуется умножить на лотность инструмента. */
  initialSecurityPrice: MoneyValue | undefined;
  /** Стадии выполнения заявки. */
  stages: OrderStage[];
  /** Сервисная комиссия. */
  serviceCommission: MoneyValue | undefined;
  /** Валюта заявки. */
  currency: string;
  /** Тип заявки. */
  orderType: OrderType;
  /** Дата и время выставления заявки в часовом поясе UTC. */
  orderDate: Date | undefined;
  /** UID идентификатор инструмента. */
  instrumentUid: string;
  /** Идентификатор ключа идемпотентности, переданный клиентом, в формате UID. Максимальная длина 36 символов. */
  orderRequestId: string;
}

/** Сделки в рамках торгового поручения. */
export interface OrderStage {
  /** Цена за 1 инструмент. Для получения стоимости лота требуется умножить на лотность инструмента. */
  price: MoneyValue | undefined;
  /** Количество лотов. */
  quantity: number;
  /** Идентификатор сделки. */
  tradeId: string;
}

/** Запрос изменения выставленной заявки. */
export interface ReplaceOrderRequest {
  /** Номер счета. */
  accountId: string;
  /** Идентификатор заявки на бирже. */
  orderId: string;
  /** Новый идентификатор запроса выставления поручения для целей идемпотентности. Максимальная длина 36 символов. Перезатирает старый ключ. */
  idempotencyKey: string;
  /** Количество лотов. */
  quantity: number;
  /** Цена за 1 инструмент. */
  price: Quotation | undefined;
  /** Тип цены. */
  priceType: PriceType;
}

export interface OrdersStreamService {
  /** Stream сделок пользователя */
  TradesStream(request: TradesStreamRequest): Observable<TradesStreamResponse>;
}

/**
 * Сервис предназначен для работы с торговыми поручениями:</br> **1**.
 * выставление;</br> **2**. отмена;</br> **3**. получение статуса;</br> **4**.
 * расчёт полной стоимости;</br> **5**. получение списка заявок.
 */
export interface OrdersService {
  /** Метод выставления заявки. */
  PostOrder(request: PostOrderRequest): Promise<PostOrderResponse>;
  /** Метод отмены биржевой заявки. */
  CancelOrder(request: CancelOrderRequest): Promise<CancelOrderResponse>;
  /** Метод получения статуса торгового поручения. */
  GetOrderState(request: GetOrderStateRequest): Promise<OrderState>;
  /** Метод получения списка активных заявок по счёту. */
  GetOrders(request: GetOrdersRequest): Promise<GetOrdersResponse>;
  /** Метод изменения выставленной заявки. */
  ReplaceOrder(request: ReplaceOrderRequest): Promise<PostOrderResponse>;
}
