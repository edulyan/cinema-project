import { MigrationInterface, QueryRunner } from "typeorm";

export class addCreatedDateTicket1681987996927 implements MigrationInterface {
    name = 'addCreatedDateTicket1681987996927'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "updatedDate"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "createdDate"`);
    }

}
