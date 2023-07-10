import { faker } from "@faker-js/faker";
import {
  UserType,
  CarsType,
  SoldVehiclesType,
  DealType,
  AdminType,
  DealershipType,
} from "types";
import bcrypt from "bcrypt";
import { insertData } from "./insertFakeData";

console.log(process.env.SALT_ROUNDS);

const createFakeUserData = (): UserType => {
  const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
  const hashedPassword = bcrypt.hashSync(faker.internet.password(), salt);

  return {
    user_email: faker.internet.email(),
    user_id: faker.datatype.uuid(),
    user_location: faker.address.city(),
    user_info: {
      docs: faker.image.imageUrl(),
    },
    password: hashedPassword,
    vehicle_info: [],
  };
};

const createFakeCarData = (): CarsType => {
  return {
    car_id: faker.datatype.uuid(),
    type: faker.vehicle.type(),
    name: faker.vehicle.vehicle(),
    model: faker.vehicle.model(),
    car_info: {
      docs: faker.image.imageUrl(),
    },
  };
};

const createFakeSoldVehicleData = (): SoldVehiclesType => {
  return {
    vehicle_id: faker.datatype.uuid(),
    car_id: faker.datatype.uuid(),
    vehicle_info: {
      docs: faker.image.imageUrl(),
    },
  };
};

const createFakeDealData = (): DealType => {
  return {
    deal_id: faker.datatype.uuid(),
    car_id: faker.datatype.uuid(),
    deal_info: {
      docs: faker.image.imageUrl(),
    },
  };
};

const createFakeAdminData = (): AdminType => {
  const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
  const hashedPassword = bcrypt.hashSync("password", salt);

  return {
    admin_id: "admin",
    password: hashedPassword,
  };
};

const createFakeDealershipData = (): DealershipType => {
  const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
  const hashedPassword = bcrypt.hashSync(faker.internet.password(), salt);

  return {
    dealership_email: faker.internet.email(),
    dealership_id: faker.datatype.uuid(),
    dealership_name: faker.company.name(),
    dealership_location: faker.address.city(),
    password: hashedPassword,
    dealership_info: {
      docs: faker.image.imageUrl(),
    },
    cars: [],
    deals: [],
    sold_vehicles: [],
  };
};

const USERS: UserType[] = faker.helpers.multiple(createFakeUserData, {
  count: 5,
});

const CARS: CarsType[] = faker.helpers.multiple(createFakeCarData, {
  count: 5,
});

const SOLD_VEHICLES: SoldVehiclesType[] = faker.helpers.multiple(
  createFakeSoldVehicleData,
  {
    count: 5,
  }
);

const DEALS: DealType[] = faker.helpers.multiple(createFakeDealData, {
  count: 5,
});

const ADMINS: AdminType = createFakeAdminData();

const DEALERSHIPS: DealershipType[] = faker.helpers.multiple(
  createFakeDealershipData,
  {
    count: 5,
  }
);

export const insertAllData = () => {
  insertData(USERS, "user");
  insertData(CARS, "cars");
  insertData(SOLD_VEHICLES, "sold_vehicles");
  insertData(DEALS, "deal");
  insertData([ADMINS], "admin");
  insertData(DEALERSHIPS, "dealership");
};
