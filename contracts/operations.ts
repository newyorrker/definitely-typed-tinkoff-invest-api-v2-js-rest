import type { MoneyValue, Quotation } from "../contracts/common";

/** Статус запрашиваемых операций. */
export enum OperationState {
  /** OPERATION_STATE_UNSPECIFIED - Статус операции не определён */
  OPERATION_STATE_UNSPECIFIED = 0,
  /** OPERATION_STATE_EXECUTED - Исполнена. */
  OPERATION_STATE_EXECUTED = 1,
  /** OPERATION_STATE_CANCELED - Отменена. */
  OPERATION_STATE_CANCELED = 2,
  UNRECOGNIZED = -1,
}

/** Тип операции. */
export enum OperationType {
  /** OPERATION_TYPE_UNSPECIFIED - Тип операции не определён. */
  OPERATION_TYPE_UNSPECIFIED = 0,
  /** OPERATION_TYPE_INPUT - Пополнение брокерского счёта. */
  OPERATION_TYPE_INPUT = 1,
  /** OPERATION_TYPE_BOND_TAX - Удержание НДФЛ по купонам. */
  OPERATION_TYPE_BOND_TAX = 2,
  /** OPERATION_TYPE_OUTPUT_SECURITIES - Вывод ЦБ. */
  OPERATION_TYPE_OUTPUT_SECURITIES = 3,
  /** OPERATION_TYPE_OVERNIGHT - Доход по сделке РЕПО овернайт. */
  OPERATION_TYPE_OVERNIGHT = 4,
  /** OPERATION_TYPE_TAX - Удержание налога. */
  OPERATION_TYPE_TAX = 5,
  /** OPERATION_TYPE_BOND_REPAYMENT_FULL - Полное погашение облигаций. */
  OPERATION_TYPE_BOND_REPAYMENT_FULL = 6,
  /** OPERATION_TYPE_SELL_CARD - Продажа ЦБ с карты. */
  OPERATION_TYPE_SELL_CARD = 7,
  /** OPERATION_TYPE_DIVIDEND_TAX - Удержание налога по дивидендам. */
  OPERATION_TYPE_DIVIDEND_TAX = 8,
  /** OPERATION_TYPE_OUTPUT - Вывод денежных средств. */
  OPERATION_TYPE_OUTPUT = 9,
  /** OPERATION_TYPE_BOND_REPAYMENT - Частичное погашение облигаций. */
  OPERATION_TYPE_BOND_REPAYMENT = 10,
  /** OPERATION_TYPE_TAX_CORRECTION - Корректировка налога. */
  OPERATION_TYPE_TAX_CORRECTION = 11,
  /** OPERATION_TYPE_SERVICE_FEE - Удержание комиссии за обслуживание брокерского счёта. */
  OPERATION_TYPE_SERVICE_FEE = 12,
  /** OPERATION_TYPE_BENEFIT_TAX - Удержание налога за материальную выгоду. */
  OPERATION_TYPE_BENEFIT_TAX = 13,
  /** OPERATION_TYPE_MARGIN_FEE - Удержание комиссии за непокрытую позицию. */
  OPERATION_TYPE_MARGIN_FEE = 14,
  /** OPERATION_TYPE_BUY - Покупка ЦБ. */
  OPERATION_TYPE_BUY = 15,
  /** OPERATION_TYPE_BUY_CARD - Покупка ЦБ с карты. */
  OPERATION_TYPE_BUY_CARD = 16,
  /** OPERATION_TYPE_INPUT_SECURITIES - Перевод ценных бумаг из другого депозитария. */
  OPERATION_TYPE_INPUT_SECURITIES = 17,
  /** OPERATION_TYPE_SELL_MARGIN - Продажа в результате Margin-call. */
  OPERATION_TYPE_SELL_MARGIN = 18,
  /** OPERATION_TYPE_BROKER_FEE - Удержание комиссии за операцию. */
  OPERATION_TYPE_BROKER_FEE = 19,
  /** OPERATION_TYPE_BUY_MARGIN - Покупка в результате Margin-call. */
  OPERATION_TYPE_BUY_MARGIN = 20,
  /** OPERATION_TYPE_DIVIDEND - Выплата дивидендов. */
  OPERATION_TYPE_DIVIDEND = 21,
  /** OPERATION_TYPE_SELL - Продажа ЦБ. */
  OPERATION_TYPE_SELL = 22,
  /** OPERATION_TYPE_COUPON - Выплата купонов. */
  OPERATION_TYPE_COUPON = 23,
  /** OPERATION_TYPE_SUCCESS_FEE - Удержание комиссии SuccessFee. */
  OPERATION_TYPE_SUCCESS_FEE = 24,
  /** OPERATION_TYPE_DIVIDEND_TRANSFER - Передача дивидендного дохода. */
  OPERATION_TYPE_DIVIDEND_TRANSFER = 25,
  /** OPERATION_TYPE_ACCRUING_VARMARGIN - Зачисление вариационной маржи. */
  OPERATION_TYPE_ACCRUING_VARMARGIN = 26,
  /** OPERATION_TYPE_WRITING_OFF_VARMARGIN - Списание вариационной маржи. */
  OPERATION_TYPE_WRITING_OFF_VARMARGIN = 27,
  /** OPERATION_TYPE_DELIVERY_BUY - Покупка в рамках экспирации фьючерсного контракта. */
  OPERATION_TYPE_DELIVERY_BUY = 28,
  /** OPERATION_TYPE_DELIVERY_SELL - Продажа в рамках экспирации фьючерсного контракта. */
  OPERATION_TYPE_DELIVERY_SELL = 29,
  /** OPERATION_TYPE_TRACK_MFEE - Комиссия за управление по счёту автоследования. */
  OPERATION_TYPE_TRACK_MFEE = 30,
  /** OPERATION_TYPE_TRACK_PFEE - Комиссия за результат по счёту автоследования. */
  OPERATION_TYPE_TRACK_PFEE = 31,
  /** OPERATION_TYPE_TAX_PROGRESSIVE - Удержание налога по ставке 15%. */
  OPERATION_TYPE_TAX_PROGRESSIVE = 32,
  /** OPERATION_TYPE_BOND_TAX_PROGRESSIVE - Удержание налога по купонам по ставке 15%. */
  OPERATION_TYPE_BOND_TAX_PROGRESSIVE = 33,
  /** OPERATION_TYPE_DIVIDEND_TAX_PROGRESSIVE - Удержание налога по дивидендам по ставке 15%. */
  OPERATION_TYPE_DIVIDEND_TAX_PROGRESSIVE = 34,
  /** OPERATION_TYPE_BENEFIT_TAX_PROGRESSIVE - Удержание налога за материальную выгоду по ставке 15%. */
  OPERATION_TYPE_BENEFIT_TAX_PROGRESSIVE = 35,
  /** OPERATION_TYPE_TAX_CORRECTION_PROGRESSIVE - Корректировка налога по ставке 15%. */
  OPERATION_TYPE_TAX_CORRECTION_PROGRESSIVE = 36,
  /** OPERATION_TYPE_TAX_REPO_PROGRESSIVE - Удержание налога за возмещение по сделкам РЕПО по ставке 15%. */
  OPERATION_TYPE_TAX_REPO_PROGRESSIVE = 37,
  /** OPERATION_TYPE_TAX_REPO - Удержание налога за возмещение по сделкам РЕПО. */
  OPERATION_TYPE_TAX_REPO = 38,
  /** OPERATION_TYPE_TAX_REPO_HOLD - Удержание налога по сделкам РЕПО. */
  OPERATION_TYPE_TAX_REPO_HOLD = 39,
  /** OPERATION_TYPE_TAX_REPO_REFUND - Возврат налога по сделкам РЕПО. */
  OPERATION_TYPE_TAX_REPO_REFUND = 40,
  /** OPERATION_TYPE_TAX_REPO_HOLD_PROGRESSIVE - Удержание налога по сделкам РЕПО по ставке 15%. */
  OPERATION_TYPE_TAX_REPO_HOLD_PROGRESSIVE = 41,
  /** OPERATION_TYPE_TAX_REPO_REFUND_PROGRESSIVE - Возврат налога по сделкам РЕПО по ставке 15%. */
  OPERATION_TYPE_TAX_REPO_REFUND_PROGRESSIVE = 42,
  /** OPERATION_TYPE_DIV_EXT - Выплата дивидендов на карту. */
  OPERATION_TYPE_DIV_EXT = 43,
  /** OPERATION_TYPE_TAX_CORRECTION_COUPON - Корректировка налога по купонам. */
  OPERATION_TYPE_TAX_CORRECTION_COUPON = 44,
  UNRECOGNIZED = -1,
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
}

/** Текущий портфель по счёту. */
export interface PortfolioResponse {
  /** Общая стоимость акций в портфеле в рублях. */
  totalAmountShares: MoneyValue | undefined;
  /** Общая стоимость облигаций в портфеле в рублях. */
  totalAmountBonds: MoneyValue | undefined;
  /** Общая стоимость фондов в портфеле в рублях. */
  totalAmountEtf: MoneyValue | undefined;
  /** Общая стоимость валют в портфеле в рублях. */
  totalAmountCurrencies: MoneyValue | undefined;
  /** Общая стоимость фьючерсов в портфеле в рублях. */
  totalAmountFutures: MoneyValue | undefined;
  /** Текущая относительная доходность портфеля, в %. */
  expectedYield: Quotation | undefined;
  /** Список позиций портфеля. */
  positions: PortfolioPosition[];
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
  /** Средняя цена лота в позиции в пунктах (для фьючерсов). **Возможна задержка до секунды для пересчёта**. */
  averagePositionPricePt: Quotation | undefined;
  /** Текущая цена за 1 инструмент. Для получения стоимости лота требуется умножить на лотность инструмента.. */
  currentPrice: MoneyValue | undefined;
  /** Средняя цена лота в позиции по методу FIFO. **Возможна задержка до секунды для пересчёта**. */
  averagePositionPriceFifo: MoneyValue | undefined;
  /** Количество лотов в портфеле. */
  quantityLots: Quotation | undefined;
}

/** Баланс позиции ценной бумаги. */
export interface PositionsSecurities {
  /** Figi-идентификатор бумаги. */
  figi: string;
  /** Заблокировано. */
  blocked: number;
  /** Текущий незаблокированный баланс. */
  balance: number;
}

/** Баланс фьючерса. */
export interface PositionsFutures {
  /** Figi-идентификатор фьючерса. */
  figi: string;
  /** Заблокировано. */
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

/**
 * Сервис предназначен для получения:</br> **1**.  списка операций по счёту;</br> **2**.
 * портфеля по счёту;</br> **3**. позиций ценных бумаг на счёте;</br> **4**.
 * доступного остатка для вывода средств;</br> **4**. получения различных отчётов.
 */
export interface OperationsService {
  /** Метод получения списка операций по счёту. */
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
}
