export type UserType = {
  user_email: string;
  user_id: string;
  user_location: string;
  user_info: {
    docs: string;
  };
  password: string;
  vehicle_info: SoldVehiclesType["vehicle_id"][];
};

export type SoldVehiclesType = {
  vehicle_id: string;
  car_id: string;
  vehicle_info: {
    docs: string;
  };
};

export type CarsType = {
  car_id: string;
  type: string;
  name: string;
  model: string;
  car_info: {
    docs: string;
  };
};

export type DealType = {
  deal_id: string;
  car_id: string;
  deal_info: {
    docs: string;
  };
};

export type AdminType = {
  admin_id: string;
  password: string;
};

export type DealershipType = {
  dealership_email: string;
  dealership_id: string;
  dealership_name: string;
  dealership_location: string;
  password: string;
  dealership_info: {
    docs: string;
  };
  cars: CarsType["car_id"][];
  deals: DealType["deal_id"][];
  sold_vehicles: SoldVehiclesType["vehicle_id"][];
};
