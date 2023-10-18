import {
  MetaTransactionData,
  OperationType,
  SafeTransactionData,
} from '../types.js'

export function standardizeMetaTransactionData(
  tx: NonNullable<SafeTransactionData | MetaTransactionData>
): MetaTransactionData {
  const standardizedTxs: MetaTransactionData = {
    ...tx,
    operation: tx.operation ?? OperationType.Call,
  }
  return standardizedTxs
}
