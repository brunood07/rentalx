import { CarImage } from "../infra/typeorm/entities/CarImage";

interface ICarsImagesRepository {

    create(car_id: string, imagine_name: string): Promise<CarImage>;
}

export { ICarsImagesRepository };