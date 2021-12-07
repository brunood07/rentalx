import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("specifications")
class Specification {
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    // Utiliza a constructor para tirar a responsabilidade da Rota de criar o uuid
    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}

export { Specification };