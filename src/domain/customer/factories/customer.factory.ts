import Customer from "../entities/customer";
import CustomerInterface from "../entities/customer.interface";
import { v4 as uuid } from 'uuid';
import Address from "../value-objects/address";

export default class CustomerFactory {
  public static create(name: string): CustomerInterface {
    return new Customer(uuid(), name);
  }

  public static createWithAddress(name: string, address: Address): CustomerInterface {
    const customer = new Customer(uuid(), name);
    customer.changeAddress(address);

    return customer;
  }
}