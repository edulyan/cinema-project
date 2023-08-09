import { MigrationInterface, QueryRunner } from "typeorm";

export class addTicketMovie1681915105376 implements MigrationInterface {
    name = 'addTicketMovie1681915105376'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" ADD "movieId" uuid`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_66a8ccce1f873446efc78bf750e" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_66a8ccce1f873446efc78bf750e"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "movieId"`);
    }

}
