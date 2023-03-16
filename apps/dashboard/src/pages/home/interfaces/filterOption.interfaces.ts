export interface IFilterOptionProps {
  title: string;
  options: any[];
}

export interface IFilter {
  category: {
    recharge: boolean;
    travel: boolean;
    fashion: boolean;
    entertainment: boolean;
  };
  brand: {
    paytm: boolean;
    amazonPay: boolean;
    freecharge: boolean;
    googlePay: boolean;
  };
}
