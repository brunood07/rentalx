import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/inMemory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send forgot mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        mailProvider = new MailProviderInMemory();

        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        );
    });

    it("Should be able to send a forgot password mail to user", async () => {
        const sendMail = jest.spyOn(mailProvider, "sendMail");

        await usersRepositoryInMemory.create({
            driver_license: "123456",
            email: "test@test.com.br",
            name: "Test Name",
            password: "1234",
        });

        await sendForgotPasswordMailUseCase.execute("test@test.com.br");

        expect(sendMail).toHaveBeenCalled();
    });

    it("Should not be able to send an email if user does not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("test2@test.com.br")
        ).rejects.toEqual(new AppError("User doesnt exists!"));
    });

    it("Should be able to create an users token", async () => {
        const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");

        usersRepositoryInMemory.create({
            driver_license: "123456",
            email: "test@test.com.br",
            name: "Test Name",
            password: "1234",
        });

        await sendForgotPasswordMailUseCase.execute("test@test.com.br");

        expect(generateTokenMail).toBeCalled();
    });
})