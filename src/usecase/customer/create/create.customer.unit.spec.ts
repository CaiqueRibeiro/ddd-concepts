import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
  name: 'Caique',
  address: {
    street: "Rua X Amaral",
    number: 95,
    zip: '05940-158',
    city: 'Poá'
  }
}

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Create Customer unit tests', () => {
  it('should create a customer', async () => {
    const customerRepository = MockRepository();
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

    const output = await createCustomerUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city
      }
    })
  });

  it('should throw an error when name is missing', async () => {
    const customerRepository = MockRepository();
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

    input.name = '';

    await expect(createCustomerUseCase.execute(input)).rejects.toThrow('Name is required');
  });

  it('should throw an error when street is missing', async () => {
    const customerRepository = MockRepository();
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

    input.address.street = '';

    await expect(createCustomerUseCase.execute(input)).rejects.toThrow('Street is required');
  });
});