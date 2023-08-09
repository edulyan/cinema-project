import { MigrationInterface, QueryRunner } from "typeorm";

export class addSeatsTicket1684508779929 implements MigrationInterface {
    name = 'addSeatsTicket1684508779929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" ADD "seats" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "seats"`);
    }

}
