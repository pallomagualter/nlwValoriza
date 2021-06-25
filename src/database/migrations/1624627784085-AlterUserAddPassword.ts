import {IsNull, MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterUserAddPassword1624627784085 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "password",
                type: "varchar",
                isNullable: true //para permitir a criação da tabela, já que havia dados
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "password");
    }

}
