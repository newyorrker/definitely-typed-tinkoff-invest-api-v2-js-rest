import type {
  InstrumentType,
  MoneyValue,
  Quotation,
  Ping,
} from "../contracts/common";
import { Observable } from "../Observable";

/** Статус запрашиваемых операций. */
export enum OperationState {
  /** OPERATION_STATE_UNSPECIFIED - Статус операции не определён */
  OPERATION_STATE_UNSPECIFIED = "OPERATION_STATE_UNSPECIFIED",
  /** OPERATION_STATE_EXECUTED - Исполнена. */
  OPERATION_STATE_EXECUTED = "OPERATION_STATE_EXECUTED",
  /** OPERATION_STATE_CANCELED - Отменена. */
  OPERATION_STATE_CANCELED = "OPERATION_STATE_CANCELED",
  /** OPERATION_STATE_PROGRESS - Исполняется. */
  OPERATION_STATE_PROGRESS = "OPERATION_STATE_PROGRESS",
  UNRECOGNIZED = "UNRECOGNIZED",
}

/** Тип операции. */
export enum OperationType {
  /** OPERATION_TYPE_UNSPECIFIED - Тип операции не определён. */
  OPERATION_TYPE_UNSPECIFIED = "OPERATION_TYPE_UNSPECIFIED",
  /** OPERATION_TYPE_INPUT - Пополнение брокерского счёта. */
  OPERATION_TYPE_INPUT = "OPERATION_TYPE_INPUT",
  /** OPERATION_TYPE_BOND_TAX - Удержание НДФЛ по купонам. */
  OPERATION_TYPE_BOND_TAX = "OPERATION_TYPE_BOND_TAX",
  /** OPERATION_TYPE_OUTPUT_SECURITIES - Вывод ЦБ. */
  OPERATION_TYPE_OUTPUT_SECURITIES = "OPERATION_TYPE_OUTPUT_SECURITIES",
  /** OPERATION_TYPE_OVERNIGHT - Доход по сделке РЕПО овернайт. */
  OPERATION_TYPE_OVERNIGHT = "OPERATION_TYPE_OVERNIGHT",
  /** OPERATION_TYPE_TAX - Удержание налога. */
  OPERATION_TYPE_TAX = "OPERATION_TYPE_TAX",
  /** OPERATION_TYPE_BOND_REPAYMENT_FULL - Полное погашение облигаций. */
  OPERATION_TYPE_BOND_REPAYMENT_FULL = "OPERATION_TYPE_BOND_REPAYMENT_FULL",
  /** OPERATION_TYPE_SELL_CARD - Продажа ЦБ с карты. */
  OPERATION_TYPE_SELL_CARD = "OPERATION_TYPE_SELL_CARD",
  /** OPERATION_TYPE_DIVIDEND_TAX - Удержание налога по дивидендам. */
  OPERATION_TYPE_DIVIDEND_TAX = "OPERATION_TYPE_DIVIDEND_TAX",
  /** OPERATION_TYPE_OUTPUT - Вывод денежных средств. */
  OPERATION_TYPE_OUTPUT = "OPERATION_TYPE_OUTPUT",
  /** OPERATION_TYPE_BOND_REPAYMENT - Частичное погашение облигаций. */
  OPERATION_TYPE_BOND_REPAYMENT = "OPERATION_TYPE_BOND_REPAYMENT",
  /** OPERATION_TYPE_TAX_CORRECTION - Корректировка налога. */
  OPERATION_TYPE_TAX_CORRECTION = "OPERATION_TYPE_TAX_CORRECTION",
  /** OPERATION_TYPE_SERVICE_FEE - Удержание комиссии за обслуживание брокерского счёта. */
  OPERATION_TYPE_SERVICE_FEE = "OPERATION_TYPE_SERVICE_FEE",
  /** OPERATION_TYPE_BENEFIT_TAX - Удержание налога за материальную выгоду. */
  OPERATION_TYPE_BENEFIT_TAX = "OPERATION_TYPE_BENEFIT_TAX",
  /** OPERATION_TYPE_MARGIN_FEE - Удержание комиссии за непокрытую позицию. */
  OPERATION_TYPE_MARGIN_FEE = "OPERATION_TYPE_MARGIN_FEE",
  /** OPERATION_TYPE_BUY - Покупка ЦБ. */
  OPERATION_TYPE_BUY = "OPERATION_TYPE_BUY",
  /** OPERATION_TYPE_BUY_CARD - Покупка ЦБ с карты. */
  OPERATION_TYPE_BUY_CARD = "OPERATION_TYPE_BUY_CARD",
  /** OPERATION_TYPE_INPUT_SECURITIES - Перевод ценных бумаг из другого депозитария. */
  OPERATION_TYPE_INPUT_SECURITIES = "OPERATION_TYPE_INPUT_SECURITIES",
  /** OPERATION_TYPE_SELL_MARGIN - Продажа в результате Margin-call. */
  OPERATION_TYPE_SELL_MARGIN = "OPERATION_TYPE_SELL_MARGIN",
  /** OPERATION_TYPE_BROKER_FEE - Удержание комиссии за операцию. */
  OPERATION_TYPE_BROKER_FEE = "OPERATION_TYPE_BROKER_FEE",
  /** OPERATION_TYPE_BUY_MARGIN - Покупка в результате Margin-call. */
  OPERATION_TYPE_BUY_MARGIN = "OPERATION_TYPE_BUY_MARGIN",
  /** OPERATION_TYPE_DIVIDEND - Выплата дивидендов. */
  OPERATION_TYPE_DIVIDEND = "OPERATION_TYPE_DIVIDEND",
  /** OPERATION_TYPE_SELL - Продажа ЦБ. */
  OPERATION_TYPE_SELL = "OPERATION_TYPE_SELL",
  /** OPERATION_TYPE_COUPON - Выплата купонов. */
  OPERATION_TYPE_COUPON = "OPERATION_TYPE_COUPON",
  /** OPERATION_TYPE_SUCCESS_FEE - Удержание комиссии SuccessFee. */
  OPERATION_TYPE_SUCCESS_FEE = "OPERATION_TYPE_SUCCESS_FEE",
  /** OPERATION_TYPE_DIVIDEND_TRANSFER - Передача дивидендного дохода. */
  OPERATION_TYPE_DIVIDEND_TRANSFER = "OPERATION_TYPE_DIVIDEND_TRANSFER",
  /** OPERATION_TYPE_ACCRUING_VARMARGIN - Зачисление вариационной маржи. */
  OPERATION_TYPE_ACCRUING_VARMARGIN = "OPERATION_TYPE_ACCRUING_VARMARGIN",
  /** OPERATION_TYPE_WRITING_OFF_VARMARGIN - Списание вариационной маржи. */
  OPERATION_TYPE_WRITING_OFF_VARMARGIN = "OPERATION_TYPE_WRITING_OFF_VARMARGIN",
  /** OPERATION_TYPE_DELIVERY_BUY - Покупка в рамках экспирации фьючерсного контракта. */
  OPERATION_TYPE_DELIVERY_BUY = "OPERATION_TYPE_DELIVERY_BUY",
  /** OPERATION_TYPE_DELIVERY_SELL - Продажа в рамках экспирации фьючерсного контракта. */
  OPERATION_TYPE_DELIVERY_SELL = "OPERATION_TYPE_DELIVERY_SELL",
  /** OPERATION_TYPE_TRACK_MFEE - Комиссия за управление по счёту автоследования. */
  OPERATION_TYPE_TRACK_MFEE = "OPERATION_TYPE_TRACK_MFEE",
  /** OPERATION_TYPE_TRACK_PFEE - Комиссия за результат по счёту автоследования. */
  OPERATION_TYPE_TRACK_PFEE = "OPERATION_TYPE_TRACK_PFEE",
  /** OPERATION_TYPE_TAX_PROGRESSIVE - Удержание налога по ставке 15%. */
  OPERATION_TYPE_TAX_PROGRESSIVE = "OPERATION_TYPE_TAX_PROGRESSIVE",
  /** OPERATION_TYPE_BOND_TAX_PROGRESSIVE - Удержание налога по купонам по ставке 15%. */
  OPERATION_TYPE_BOND_TAX_PROGRESSIVE = "OPERATION_TYPE_BOND_TAX_PROGRESSIVE",
  /** OPERATION_TYPE_DIVIDEND_TAX_PROGRESSIVE - Удержание налога по дивидендам по ставке 15%. */
  OPERATION_TYPE_DIVIDEND_TAX_PROGRESSIVE = "OPERATION_TYPE_DIVIDEND_TAX_PROGRESSIVE",
  /** OPERATION_TYPE_BENEFIT_TAX_PROGRESSIVE - Удержание налога за материальную выгоду по ставке 15%. */
  OPERATION_TYPE_BENEFIT_TAX_PROGRESSIVE = "OPERATION_TYPE_BENEFIT_TAX_PROGRESSIVE",
  /** OPERATION_TYPE_TAX_CORRECTION_PROGRESSIVE - Корректировка налога по ставке 15%. */
  OPERATION_TYPE_TAX_CORRECTION_PROGRESSIVE = "OPERATION_TYPE_TAX_CORRECTION_PROGRESSIVE",
  /** OPERATION_TYPE_TAX_REPO_PROGRESSIVE - Удержание налога за возмещение по сделкам РЕПО по ставке 15%. */
  OPERATION_TYPE_TAX_REPO_PROGRESSIVE = "OPERATION_TYPE_TAX_REPO_PROGRESSIVE",
  /** OPERATION_TYPE_TAX_REPO - Удержание налога за возмещение по сделкам РЕПО. */
  OPERATION_TYPE_TAX_REPO = "OPERATION_TYPE_TAX_REPO",
  /** OPERATION_TYPE_TAX_REPO_HOLD - Удержание налога по сделкам РЕПО. */
  OPERATION_TYPE_TAX_REPO_HOLD = "OPERATION_TYPE_TAX_REPO_HOLD",
  /** OPERATION_TYPE_TAX_REPO_REFUND - Возврат налога по сделкам РЕПО. */
  OPERATION_TYPE_TAX_REPO_REFUND = "OPERATION_TYPE_TAX_REPO_REFUND",
  /** OPERATION_TYPE_TAX_REPO_HOLD_PROGRESSIVE - Удержание налога по сделкам РЕПО по ставке 15%. */
  OPERATION_TYPE_TAX_REPO_HOLD_PROGRESSIVE = "OPERATION_TYPE_TAX_REPO_HOLD_PROGRESSIVE",
  /** OPERATION_TYPE_TAX_REPO_REFUND_PROGRESSIVE - Возврат налога по сделкам РЕПО по ставке 15%. */
  OPERATION_TYPE_TAX_REPO_REFUND_PROGRESSIVE = "OPERATION_TYPE_TAX_REPO_REFUND_PROGRESSIVE",
  /** OPERATION_TYPE_DIV_EXT - Выплата дивидендов на карту. */
  OPERATION_TYPE_DIV_EXT = "OPERATION_TYPE_DIV_EXT",
  /** OPERATION_TYPE_TAX_CORRECTION_COUPON - Корректировка налога по купонам. */
  OPERATION_TYPE_TAX_CORRECTION_COUPON = "OPERATION_TYPE_TAX_CORRECTION_COUPON",
  /** OPERATION_TYPE_CASH_FEE - Комиссия за валютный остаток. */
  OPERATION_TYPE_CASH_FEE = "OPERATION_TYPE_CASH_FEE",
  /** OPERATION_TYPE_OUT_FEE - Комиссия за вывод валюты с брокерского счета. */
  OPERATION_TYPE_OUT_FEE = "OPERATION_TYPE_OUT_FEE",
  /** OPERATION_TYPE_OUT_STAMP_DUTY - Гербовый сбор. */
  OPERATION_TYPE_OUT_STAMP_DUTY = "OPERATION_TYPE_OUT_STAMP_DUTY",
  /** OPERATION_TYPE_OUTPUT_SWIFT - SWIFT-перевод */
  OPERATION_TYPE_OUTPUT_SWIFT = "OPERATION_TYPE_OUTPUT_SWIFT",
  /** OPERATION_TYPE_INPUT_SWIFT - SWIFT-перевод */
  OPERATION_TYPE_INPUT_SWIFT = "OPERATION_TYPE_INPUT_SWIFT",
  /** OPERATION_TYPE_OUTPUT_ACQUIRING - Перевод на карту */
  OPERATION_TYPE_OUTPUT_ACQUIRING = "OPERATION_TYPE_OUTPUT_ACQUIRING",
  /** OPERATION_TYPE_INPUT_ACQUIRING - Перевод с карты */
  OPERATION_TYPE_INPUT_ACQUIRING = "OPERATION_TYPE_INPUT_ACQUIRING",
  /** OPERATION_TYPE_OUTPUT_PENALTY - Комиссия за вывод средств */
  OPERATION_TYPE_OUTPUT_PENALTY = "OPERATION_TYPE_OUTPUT_PENALTY",
  /** OPERATION_TYPE_ADVICE_FEE - Списание оплаты за сервис Советов */
  OPERATION_TYPE_ADVICE_FEE = "OPERATION_TYPE_ADVICE_FEE",
  /** OPERATION_TYPE_TRANS_IIS_BS - Перевод ценных бумаг с ИИС на Брокерский счет */
  OPERATION_TYPE_TRANS_IIS_BS = "OPERATION_TYPE_TRANS_IIS_BS",
  /** OPERATION_TYPE_TRANS_BS_BS - Перевод ценных бумаг с одного брокерского счета на другой */
  OPERATION_TYPE_TRANS_BS_BS = "OPERATION_TYPE_TRANS_BS_BS",
  /** OPERATION_TYPE_OUT_MULTI - Вывод денежных средств со счета */
  OPERATION_TYPE_OUT_MULTI = "OPERATION_TYPE_OUT_MULTI",
  /** OPERATION_TYPE_INP_MULTI - Пополнение денежных средств со счета */
  OPERATION_TYPE_INP_MULTI = "OPERATION_TYPE_INP_MULTI",
  /** OPERATION_TYPE_OVER_PLACEMENT - Размещение биржевого овернайта */
  OPERATION_TYPE_OVER_PLACEMENT = "OPERATION_TYPE_OVER_PLACEMENT",
  /** OPERATION_TYPE_OVER_COM - Списание комиссии */
  OPERATION_TYPE_OVER_COM = "OPERATION_TYPE_OVER_COM",
  /** OPERATION_TYPE_OVER_INCOME - Доход от оверанайта */
  OPERATION_TYPE_OVER_INCOME = "OPERATION_TYPE_OVER_INCOME",
  /** OPERATION_TYPE_OPTION_EXPIRATION - Экспирация */
  OPERATION_TYPE_OPTION_EXPIRATION = "OPERATION_TYPE_OPTION_EXPIRATION",
  UNRECOGNIZED = "UNRECOGNIZED",
}

/** Результат подписки. */
export enum PortfolioSubscriptionStatus {
  /** PORTFOLIO_SUBSCRIPTION_STATUS_UNSPECIFIED - Тип не определён. */
  PORTFOLIO_SUBSCRIPTION_STATUS_UNSPECIFIED = "PORTFOLIO_SUBSCRIPTION_STATUS_UNSPECIFIED",
  /** PORTFOLIO_SUBSCRIPTION_STATUS_SUCCESS - Успешно. */
  PORTFOLIO_SUBSCRIPTION_STATUS_SUCCESS = "PORTFOLIO_SUBSCRIPTION_STATUS_SUCCESS",
  /** PORTFOLIO_SUBSCRIPTION_STATUS_ACCOUNT_NOT_FOUND - Счёт не найден или недостаточно прав. */
  PORTFOLIO_SUBSCRIPTION_STATUS_ACCOUNT_NOT_FOUND = "PORTFOLIO_SUBSCRIPTION_STATUS_ACCOUNT_NOT_FOUND",
  /** PORTFOLIO_SUBSCRIPTION_STATUS_INTERNAL_ERROR - Произошла ошибка. */
  PORTFOLIO_SUBSCRIPTION_STATUS_INTERNAL_ERROR = "PORTFOLIO_SUBSCRIPTION_STATUS_INTERNAL_ERROR",
  UNRECOGNIZED = "UNRECOGNIZED",
}

/** Результат подписки. */
export enum PositionsAccountSubscriptionStatus {
  /** POSITIONS_SUBSCRIPTION_STATUS_UNSPECIFIED - Тип не определён. */
  POSITIONS_SUBSCRIPTION_STATUS_UNSPECIFIED = "POSITIONS_SUBSCRIPTION_STATUS_UNSPECIFIED",
  /** POSITIONS_SUBSCRIPTION_STATUS_SUCCESS - Успешно. */
  POSITIONS_SUBSCRIPTION_STATUS_SUCCESS = "POSITIONS_SUBSCRIPTION_STATUS_SUCCESS",
  /** POSITIONS_SUBSCRIPTION_STATUS_ACCOUNT_NOT_FOUND - Счёт не найден или недостаточно прав. */
  POSITIONS_SUBSCRIPTION_STATUS_ACCOUNT_NOT_FOUND = "POSITIONS_SUBSCRIPTION_STATUS_ACCOUNT_NOT_FOUND",
  /** POSITIONS_SUBSCRIPTION_STATUS_INTERNAL_ERROR - Произошла ошибка. */
  POSITIONS_SUBSCRIPTION_STATUS_INTERNAL_ERROR = "POSITIONS_SUBSCRIPTION_STATUS_INTERNAL_ERROR",
  UNRECOGNIZED = "UNRECOGNIZED",
}

/** Запрос получения списка операций по счёту. */
export interface OperationsRequest {
  /** Идентификатор счёта клиента. */
  accountId: string;
  /** Начало периода (по UTC). */
  from: Date | undefined;
  /** Окончание периода (по UTC). */
  to: Date | undefined;
  /** Статус запрашиваемых операций. */
  state: OperationState;
  /** Figi-идентификатор инструмента для фильтрации. */
  figi: string;
}

/** Список операций. */
export interface OperationsResponse {
  /** Массив операций. */
  operations: Operation[];
}

/** Данные по операции. */
export interface Operation {
  /** Идентификатор операции. */
  id: string;
  /** Идентификатор родительской операции. */
  parentOperationId: string;
  /** Валюта операции. */
  currency: string;
  /** Сумма операции. */
  payment: MoneyValue | undefined;
  /** Цена операции за 1 инструмент. Для получения стоимости лота требуется умножить на лотность инструмента. */
  price: MoneyValue | undefined;
  /** Статус операции. */
  state: OperationState;
  /** Количество единиц инструмента. */
  quantity: number;
  /** Неисполненный остаток по сделке. */
  quantityRest: number;
  /** Figi-идентификатор инструмента, связанного с операцией. */
  figi: string;
  /** Тип инструмента. Возможные значения: </br>**bond** — облигация; </br>**share** — акция; </br>**currency** — валюта; </br>**etf** — фонд; </br>**futures** — фьючерс. */
  instrumentType: string;
  /** Дата и время операции в формате часовом поясе UTC. */
  date: Date | undefined;
  /** Текстовое описание типа операции. */
  type: string;
  /** Тип операции. */
  operationType: OperationType;
  /** Массив сделок. */
  trades: OperationTrade[];
  /** Идентификатор актива */
  assetUid: string;
  /** position_uid-идентификатора инструмента. */
  positionUid: string;
  /** Уникальный идентификатор инструмента. */
  instrumentUid: string;
}

/** Сделка по операции. */
export interface OperationTrade {
  /** Идентификатор сделки. */
  tradeId: string;
  /** Дата и время сделки в часовом поясе UTC. */
  dateTime: Date | undefined;
  /** Количество инструментов. */
  quantity: number;
  /** Цена за 1 инструмент. Для получения стоимости лота требуется умножить на лотность инструмента. */
  price: MoneyValue | undefined;
}

/** Запрос получения текущего портфеля по счёту. */
export interface PortfolioRequest {
  /** Идентификатор счёта пользователя. */
  accountId: string;
  /** Валюта, в которой требуется рассчитать портфель */
  currency: PortfolioRequest_CurrencyRequest;
}

export enum PortfolioRequest_CurrencyRequest {
  /** RUB - Рубли */
  RUB = "RUB",
  /** USD - Доллары */
  USD = "USD",
  /** EUR - Евро */
  EUR = "EUR",
  UNRECOGNIZED = "UNRECOGNIZED",
}

/** Текущий портфель по счёту. */
export interface PortfolioResponse {
  /** Общая стоимость акций в портфеле. */
  totalAmountShares: MoneyValue | undefined;
  /** Общая стоимость облигаций в портфеле. */
  totalAmountBonds: MoneyValue | undefined;
  /** Общая стоимость фондов в портфеле. */
  totalAmountEtf: MoneyValue | undefined;
  /** Общая стоимость валют в портфеле. */
  totalAmountCurrencies: MoneyValue | undefined;
  /** Общая стоимость фьючерсов в портфеле. */
  totalAmountFutures: MoneyValue | undefined;
  /** Текущая относительная доходность портфеля, в %. */
  expectedYield: Quotation | undefined;
  /** Список позиций портфеля. */
  positions: PortfolioPosition[];
  /** Идентификатор счёта пользователя. */
  accountId: string;
  /** Общая стоимость опционов в портфеле. */
  totalAmountOptions: MoneyValue | undefined;
  /** Общая стоимость структурных нот в портфеле. */
  totalAmountSp: MoneyValue | undefined;
  /** Общая стоимость портфеля. */
  totalAmountPortfolio: MoneyValue | undefined;
  /** Массив виртуальных позиций портфеля. */
  virtualPositions: VirtualPortfolioPosition[];
}

/** Запрос позиций портфеля по счёту. */
export interface PositionsRequest {
  /** Идентификатор счёта пользователя. */
  accountId: string;
}

/** Список позиций по счёту. */
export interface PositionsResponse {
  /** Массив валютных позиций портфеля. */
  money: MoneyValue[];
  /** Массив заблокированных валютных позиций портфеля. */
  blocked: MoneyValue[];
  /** Список ценно-бумажных позиций портфеля. */
  securities: PositionsSecurities[];
  /** Признак идущей в данный момент выгрузки лимитов. */
  limitsLoadingInProgress: boolean;
  /** Список фьючерсов портфеля. */
  futures: PositionsFutures[];
  /** Список опционов портфеля. */
  options: PositionsOptions[];
}

/** Запрос доступного для вывода остатка. */
export interface WithdrawLimitsRequest {
  /** Идентификатор счёта пользователя. */
  accountId: string;
}

/** Доступный для вывода остаток. */
export interface WithdrawLimitsResponse {
  /** Массив валютных позиций портфеля. */
  money: MoneyValue[];
  /** Массив заблокированных валютных позиций портфеля. */
  blocked: MoneyValue[];
  /** Заблокировано под гарантийное обеспечение фьючерсов. */
  blockedGuarantee: MoneyValue[];
}

/** Позиции портфеля. */
export interface PortfolioPosition {
  /** Figi-идентификатора инструмента. */
  figi: string;
  /** Тип инструмента. */
  instrumentType: string;
  /** Количество инструмента в портфеле в штуках. */
  quantity: Quotation | undefined;
  /** Средневзвешенная цена позиции. **Возможна задержка до секунды для пересчёта**. */
  averagePositionPrice: MoneyValue | undefined;
  /** Текущая рассчитанная доходность позиции. */
  expectedYield: Quotation | undefined;
  /** Текущий НКД. */
  currentNkd: MoneyValue | undefined;
  /**
   * Deprecated Средняя цена позиции в пунктах (для фьючерсов). **Возможна задержка до секунды для пересчёта**.
   *
   * @deprecated
   */
  averagePositionPricePt: Quotation | undefined;
  /** Текущая цена за 1 инструмент. Для получения стоимости лота требуется умножить на лотность инструмента. */
  currentPrice: MoneyValue | undefined;
  /** Средняя цена позиции по методу FIFO. **Возможна задержка до секунды для пересчёта**. */
  averagePositionPriceFifo: MoneyValue | undefined;
  /**
   * Deprecated Количество лотов в портфеле.
   *
   * @deprecated
   */
  quantityLots: Quotation | undefined;
  /** Заблокировано на бирже. */
  blocked: boolean;
  /** Количество бумаг, заблокированных выставленными заявками. */
  blockedLots: Quotation | undefined;
  /** position_uid-идентификатора инструмента */
  positionUid: string;
  /** instrument_uid-идентификатора инструмента */
  instrumentUid: string;
  /** Вариационная маржа */
  varMargin: MoneyValue | undefined;
  /** Текущая рассчитанная доходность позиции. */
  expectedYieldFifo: Quotation | undefined;
}

export interface VirtualPortfolioPosition {
  /** position_uid-идентификатора инструмента */
  positionUid: string;
  /** instrument_uid-идентификатора инструмента */
  instrumentUid: string;
  /** Figi-идентификатора инструмента. */
  figi: string;
  /** Тип инструмента. */
  instrumentType: string;
  /** Количество инструмента в портфеле в штуках. */
  quantity: Quotation | undefined;
  /** Средневзвешенная цена позиции. **Возможна задержка до секунды для пересчёта**. */
  averagePositionPrice: MoneyValue | undefined;
  /** Текущая рассчитанная доходность позиции. */
  expectedYield: Quotation | undefined;
  /** Текущая рассчитанная доходность позиции. */
  expectedYieldFifo: Quotation | undefined;
  /** Дата до которой нужно продать виртуальные бумаги, после этой даты виртуальная позиция "сгорит" */
  expireDate: Date | undefined;
  /** Текущая цена за 1 инструмент. Для получения стоимости лота требуется умножить на лотность инструмента. */
  currentPrice: MoneyValue | undefined;
  /** Средняя цена позиции по методу FIFO. **Возможна задержка до секунды для пересчёта**. */
  averagePositionPriceFifo: MoneyValue | undefined;
}

/** Баланс позиции ценной бумаги. */
export interface PositionsSecurities {
  /** Figi-идентификатор бумаги. */
  figi: string;
  /** Количество бумаг заблокированных выставленными заявками. */
  blocked: number;
  /** Текущий незаблокированный баланс. */
  balance: number;
  /** Уникальный идентификатор позиции. */
  positionUid: string;
  /** Уникальный идентификатор  инструмента. */
  instrumentUid: string;
  /** Заблокировано на бирже. */
  exchangeBlocked: boolean;
  /** Тип инструмента. */
  instrumentType: string;
}

/** Баланс фьючерса. */
export interface PositionsFutures {
  /** Figi-идентификатор фьючерса. */
  figi: string;
  /** Количество бумаг заблокированных выставленными заявками. */
  blocked: number;
  /** Текущий незаблокированный баланс. */
  balance: number;
  /** Уникальный идентификатор позиции. */
  positionUid: string;
  /** Уникальный идентификатор  инструмента. */
  instrumentUid: string;
}

/** Баланс опциона. */
export interface PositionsOptions {
  /** Уникальный идентификатор позиции опциона. */
  positionUid: string;
  /** Уникальный идентификатор  инструмента. */
  instrumentUid: string;
  /** Количество бумаг заблокированных выставленными заявками. */
  blocked: number;
  /** Текущий незаблокированный баланс. */
  balance: number;
}

export interface BrokerReportRequest {
  generateBrokerReportRequest: GenerateBrokerReportRequest | undefined;
  getBrokerReportRequest: GetBrokerReportRequest | undefined;
}

export interface BrokerReportResponse {
  generateBrokerReportResponse: GenerateBrokerReportResponse | undefined;
  getBrokerReportResponse: GetBrokerReportResponse | undefined;
}

export interface GenerateBrokerReportRequest {
  /** Идентификатор счёта клиента. */
  accountId: string;
  /** Начало периода в часовом поясе UTC. */
  from: Date | undefined;
  /** Окончание периода в часовом поясе UTC. */
  to: Date | undefined;
}

export interface GenerateBrokerReportResponse {
  /** Идентификатор задачи формирования брокерского отчёта. */
  taskId: string;
}

export interface GetBrokerReportRequest {
  /** Идентификатор задачи формирования брокерского отчёта. */
  taskId: string;
  /** Номер страницы отчета (начинается с 1), значение по умолчанию: 0. */
  page: number;
}

export interface GetBrokerReportResponse {
  brokerReport: BrokerReport[];
  /** Количество записей в отчете. */
  itemsCount: number;
  /** Количество страниц с данными отчета (начинается с 0). */
  pagesCount: number;
  /** Текущая страница (начинается с 0). */
  page: number;
}

export interface BrokerReport {
  /** Номер сделки. */
  tradeId: string;
  /** Номер поручения. */
  orderId: string;
  /** Figi-идентификатор инструмента. */
  figi: string;
  /** Признак исполнения. */
  executeSign: string;
  /** Дата и время заключения в часовом поясе UTC. */
  tradeDatetime: Date | undefined;
  /** Торговая площадка. */
  exchange: string;
  /** Режим торгов. */
  classCode: string;
  /** Вид сделки. */
  direction: string;
  /** Сокращённое наименование актива. */
  name: string;
  /** Код актива. */
  ticker: string;
  /** Цена за единицу. */
  price: MoneyValue | undefined;
  /** Количество. */
  quantity: number;
  /** Сумма (без НКД). */
  orderAmount: MoneyValue | undefined;
  /** НКД. */
  aciValue: Quotation | undefined;
  /** Сумма сделки. */
  totalOrderAmount: MoneyValue | undefined;
  /** Комиссия брокера. */
  brokerCommission: MoneyValue | undefined;
  /** Комиссия биржи. */
  exchangeCommission: MoneyValue | undefined;
  /** Комиссия клир. центра. */
  exchangeClearingCommission: MoneyValue | undefined;
  /** Ставка РЕПО (%). */
  repoRate: Quotation | undefined;
  /** Контрагент/Брокер. */
  party: string;
  /** Дата расчётов в часовом поясе UTC. */
  clearValueDate: Date | undefined;
  /** Дата поставки в часовом поясе UTC. */
  secValueDate: Date | undefined;
  /** Статус брокера. */
  brokerStatus: string;
  /** Тип дог. */
  separateAgreementType: string;
  /** Номер дог. */
  separateAgreementNumber: string;
  /** Дата дог. */
  separateAgreementDate: string;
  /** Тип расчёта по сделке. */
  deliveryType: string;
}

export interface GetDividendsForeignIssuerRequest {
  /** Объект запроса формирования отчёта. */
  generateDivForeignIssuerReport:
    | GenerateDividendsForeignIssuerReportRequest
    | undefined;
  /** Объект запроса сформированного отчёта. */
  getDivForeignIssuerReport: GetDividendsForeignIssuerReportRequest | undefined;
}

export interface GetDividendsForeignIssuerResponse {
  /** Объект результата задачи запуска формирования отчёта. */
  generateDivForeignIssuerReportResponse:
    | GenerateDividendsForeignIssuerReportResponse
    | undefined;
  /** Отчёт "Справка о доходах за пределами РФ". */
  divForeignIssuerReport: GetDividendsForeignIssuerReportResponse | undefined;
}

/** Объект запроса формирования отчёта "Справка о доходах за пределами РФ". */
export interface GenerateDividendsForeignIssuerReportRequest {
  /** Идентификатор счёта клиента. */
  accountId: string;
  /** Начало периода (по UTC). */
  from: Date | undefined;
  /** Окончание периода (по UTC). */
  to: Date | undefined;
}

/** Объект запроса сформированного отчёта "Справка о доходах за пределами РФ". */
export interface GetDividendsForeignIssuerReportRequest {
  /** Идентификатор задачи формирования отчёта. */
  taskId: string;
  /** Номер страницы отчета (начинается с 0), значение по умолчанию: 0. */
  page: number;
}

/** Объект результата задачи запуска формирования отчёта "Справка о доходах за пределами РФ". */
export interface GenerateDividendsForeignIssuerReportResponse {
  /** Идентификатор задачи формирования отчёта. */
  taskId: string;
}

export interface GetDividendsForeignIssuerReportResponse {
  dividendsForeignIssuerReport: DividendsForeignIssuerReport[];
  /** Количество записей в отчете. */
  itemsCount: number;
  /** Количество страниц с данными отчета (начинается с 0). */
  pagesCount: number;
  /** Текущая страница (начинается с 0). */
  page: number;
}

/** Отчёт "Справка о доходах за пределами РФ". */
export interface DividendsForeignIssuerReport {
  /** Дата фиксации реестра. */
  recordDate: Date | undefined;
  /** Дата выплаты. */
  paymentDate: Date | undefined;
  /** Наименование ценной бумаги. */
  securityName: string;
  /** ISIN-идентификатор ценной бумаги. */
  isin: string;
  /** Страна эмитента. Для депозитарных расписок указывается страна эмитента базового актива. */
  issuerCountry: string;
  /** Количество ценных бумаг. */
  quantity: number;
  /** Выплаты на одну бумагу */
  dividend: Quotation | undefined;
  /** Комиссия внешних платёжных агентов. */
  externalCommission: Quotation | undefined;
  /** Сумма до удержания налога. */
  dividendGross: Quotation | undefined;
  /** Сумма налога, удержанного агентом. */
  tax: Quotation | undefined;
  /** Итоговая сумма выплаты. */
  dividendAmount: Quotation | undefined;
  /** Валюта. */
  currency: string;
}

/** Запрос установки stream-соединения. */
export interface PortfolioStreamRequest {
  /** Массив идентификаторов счётов пользователя */
  accounts: string[];
}

/** Информация по позициям и доходностям портфелей. */
export interface PortfolioStreamResponse {
  /** Объект результата подписки. */
  subscriptions: PortfolioSubscriptionResult | undefined;
  /** Объект стриминга портфеля. */
  portfolio: PortfolioResponse | undefined;
  /** Проверка активности стрима. */
  ping: Ping | undefined;
}

/** Объект результата подписки. */
export interface PortfolioSubscriptionResult {
  /** Массив счетов клиента. */
  accounts: AccountSubscriptionStatus[];
}

/** Счет клиента. */
export interface AccountSubscriptionStatus {
  /** Идентификатор счёта */
  accountId: string;
  /** Результат подписки. */
  subscriptionStatus: PortfolioSubscriptionStatus;
}

/** Запрос списка операций по счёту с пагинацией. */
export interface GetOperationsByCursorRequest {
  /** Идентификатор счёта клиента. Обязательный параметр для данного метода, остальные параметры опциональны. */
  accountId: string;
  /** Идентификатор инструмента (Figi инструмента или uid инструмента) */
  instrumentId: string;
  /** Начало периода (по UTC). */
  from: Date | undefined;
  /** Окончание периода (по UTC). */
  to: Date | undefined;
  /** Идентификатор элемента, с которого начать формировать ответ. */
  cursor: string;
  /** Лимит количества операций. По умолчанию устанавливается значение **100**, максимальное значение 1000. */
  limit: number;
  /** Тип операции. Принимает значение из списка OperationType. */
  operationTypes: OperationType[];
  /** Статус запрашиваемых операций, возможные значения указаны в OperationState. */
  state: OperationState;
  /** Флаг возвращать ли комиссии, по умолчанию false */
  withoutCommissions: boolean;
  /** Флаг получения ответа без массива сделок. */
  withoutTrades: boolean;
  /** Флаг не показывать overnight операций. */
  withoutOvernights: boolean;
}

/** Список операций по счёту с пагинацией. */
export interface GetOperationsByCursorResponse {
  /** Признак, есть ли следующий элемент. */
  hasNext: boolean;
  /** Следующий курсор. */
  nextCursor: string;
  /** Список операций. */
  items: OperationItem[];
}

/** Данные об операции. */
export interface OperationItem {
  /** Курсор. */
  cursor: string;
  /** Номер счета клиента. */
  brokerAccountId: string;
  /** Идентификатор операции, может меняться с течением времени. */
  id: string;
  /** Идентификатор родительской операции, может измениться, если изменился id родительской операции. */
  parentOperationId: string;
  /** Название операции. */
  name: string;
  /** Дата поручения. */
  date: Date | undefined;
  /** Тип операции. */
  type: OperationType;
  /** Описание операции. */
  description: string;
  /** Статус поручения. */
  state: OperationState;
  /** Уникальный идентификатор инструмента. */
  instrumentUid: string;
  /** Figi. */
  figi: string;
  /** Тип инструмента. */
  instrumentType: string;
  /** Тип инструмента. */
  instrumentKind: InstrumentType;
  /** position_uid-идентификатора инструмента. */
  positionUid: string;
  /** Сумма операции. */
  payment: MoneyValue | undefined;
  /** Цена операции за 1 инструмент. */
  price: MoneyValue | undefined;
  /** Комиссия. */
  commission: MoneyValue | undefined;
  /** Доходность. */
  yield: MoneyValue | undefined;
  /** Относительная доходность. */
  yieldRelative: Quotation | undefined;
  /** Накопленный купонный доход. */
  accruedInt: MoneyValue | undefined;
  /** Количество единиц инструмента. */
  quantity: number;
  /** Неисполненный остаток по сделке. */
  quantityRest: number;
  /** Исполненный остаток. */
  quantityDone: number;
  /** Дата и время снятия заявки. */
  cancelDateTime: Date | undefined;
  /** Причина отмены операции. */
  cancelReason: string;
  /** Массив сделок. */
  tradesInfo: OperationItemTrades | undefined;
  /** Идентификатор актива */
  assetUid: string;
}

/** Массив с информацией о сделках. */
export interface OperationItemTrades {
  trades: OperationItemTrade[];
}

/** Сделка по операции. */
export interface OperationItemTrade {
  /** Номер сделки */
  num: string;
  /** Дата сделки */
  date: Date | undefined;
  /** Количество в единицах. */
  quantity: number;
  /** Цена. */
  price: MoneyValue | undefined;
  /** Доходность. */
  yield: MoneyValue | undefined;
  /** Относительная доходность. */
  yieldRelative: Quotation | undefined;
}

/** Запрос установки stream-соединения позиций. */
export interface PositionsStreamRequest {
  /** Массив идентификаторов счётов пользователя */
  accounts: string[];
}

/** Информация по изменению позиций портфеля. */
export interface PositionsStreamResponse {
  /** Объект результата подписки. */
  subscriptions: PositionsSubscriptionResult | undefined;
  /** Объект стриминга позиций. */
  position: PositionData | undefined;
  /** Проверка активности стрима. */
  ping: Ping | undefined;
}

/** Объект результата подписки. */
export interface PositionsSubscriptionResult {
  /** Массив счетов клиента. */
  accounts: PositionsSubscriptionStatus[];
}

/** Счет клиента. */
export interface PositionsSubscriptionStatus {
  /** Идентификатор счёта */
  accountId: string;
  /** Результат подписки. */
  subscriptionStatus: PositionsAccountSubscriptionStatus;
}

/** Данные о позиции портфеля. */
export interface PositionData {
  /** Идентификатор счёта. */
  accountId: string;
  /** Массив валютных позиций портфеля. */
  money: PositionsMoney[];
  /** Список ценно-бумажных позиций портфеля. */
  securities: PositionsSecurities[];
  /** Список фьючерсов портфеля. */
  futures: PositionsFutures[];
  /** Список опционов портфеля. */
  options: PositionsOptions[];
  /** Дата и время операции в формате UTC. */
  date: Date | undefined;
}

/** Валютная позиция портфеля. */
export interface PositionsMoney {
  /** Доступное количество валютный позиций. */
  availableValue: MoneyValue | undefined;
  /** Заблокированное количество валютный позиций. */
  blockedValue: MoneyValue | undefined;
}

/**
 * Сервис предназначен для получения:</br> **1**.  списка операций по счёту;</br> **2**.
 * портфеля по счёту;</br> **3**. позиций ценных бумаг на счёте;</br> **4**.
 * доступного остатка для вывода средств;</br> **5**. получения различных отчётов.
 */
export interface OperationsService {
  /**
   * Метод получения списка операций по счёту.При работе с данным методом необходимо учитывать
   * [особенности взаимодействия](/investAPI/operations_problems) с данным методом.
   */
  GetOperations(request: OperationsRequest): Promise<OperationsResponse>;
  /** Метод получения портфеля по счёту. */
  GetPortfolio(request: PortfolioRequest): Promise<PortfolioResponse>;
  /** Метод получения списка позиций по счёту. */
  GetPositions(request: PositionsRequest): Promise<PositionsResponse>;
  /** Метод получения доступного остатка для вывода средств. */
  GetWithdrawLimits(
    request: WithdrawLimitsRequest
  ): Promise<WithdrawLimitsResponse>;
  /** Метод получения брокерского отчёта. */
  GetBrokerReport(request: BrokerReportRequest): Promise<BrokerReportResponse>;
  /** Метод получения отчёта "Справка о доходах за пределами РФ". */
  GetDividendsForeignIssuer(
    request: GetDividendsForeignIssuerRequest
  ): Promise<GetDividendsForeignIssuerResponse>;
  /**
   * Метод получения списка операций по счёту с пагинацией. При работе с данным методом необходимо учитывать
   * [особенности взаимодействия](/investAPI/operations_problems) с данным методом.
   */
  GetOperationsByCursor(
    request: GetOperationsByCursorRequest
  ): Promise<GetOperationsByCursorResponse>;
}

export interface OperationsStreamService {
  /** Server-side stream обновлений портфеля */
  PortfolioStream(
    request: PortfolioStreamRequest
  ): Observable<PortfolioStreamResponse>;
  /** Server-side stream обновлений информации по изменению позиций портфеля */
  PositionsStream(
    request: PositionsStreamRequest
  ): Observable<PositionsStreamResponse>;
}
