import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number, 
  price_def: number,
  ratio: number,
  timestamp: Date,
  upperbound: number, 
  lowerbound: number,
  trigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]) {
    const price_ABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) /2; // calculating price of the stocks using Task 1.
    const price_DEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) /2; // using the array from serverResponse where 1st is ABC 2nd is DEF
    const ratio = price_ABC / price_DEF;
    const upperBound = 1.05;
    const lowerBound = 0.95;
    return {
      price_abc: price_ABC,  
      price_def: price_DEF,
      ratio,
      timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ? 
        serverResponds[0].timestamp : serverResponds[1].timestamp,
      upperbound: upperBound,
      lowerbound: lowerBound,
      trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
    };
  }
}
