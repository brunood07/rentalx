import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";


let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    });

    it("Should be able to list all available cars.", async () => {

        const car = await carsRepositoryInMemory.create({
            "name": "Car1",
            "description": "Car description",
            "daily_rate": 110,
            "license_plate": "DEF-1234",
            "fine_amount": 40,
            "brand": "Car Brand",
            "category_id": "category_id"
        });

        const cars = await listAvailableCarsUseCase.execute({});
        
        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            "name": "Car2",
            "description": "Car description",
            "daily_rate": 110,
            "license_plate": "DEF-1234",
            "fine_amount": 40,
            "brand": "Car Brand2",
            "category_id": "category_id"
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car Brand2",
        });

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            "name": "Car3",
            "description": "Car description",
            "daily_rate": 110,
            "license_plate": "DEF-1235",
            "fine_amount": 40,
            "brand": "Car Brand2",
            "category_id": "category_id"
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Car3",
        });

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by category ID", async () => {
        const car = await carsRepositoryInMemory.create({
            "name": "Car2",
            "description": "Car description",
            "daily_rate": 110,
            "license_plate": "DEF-1236",
            "fine_amount": 40,
            "brand": "Car Brand2",
            "category_id": "12345"
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "12345",
        });

        expect(cars).toEqual([car]);
    });
})