import { MigrationInterface, QueryRunner } from "typeorm";

export class addSlugsSeatPrice1681652283915 implements MigrationInterface {
    name = 'addSlugsSeatPrice1681652283915'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "sessionTime"`);
        await queryRunner.query(`ALTER TABLE "session" ADD "startTime" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ADD "endTime" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ADD "scheduleId" uuid`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "duration"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "duration" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_fcf2c3557bfade0dfb41cdd7098" FOREIGN KEY ("scheduleId") REFERENCES "schedule"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_fcf2c3557bfade0dfb41cdd7098"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "duration"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "duration" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "scheduleId"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "endTime"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "startTime"`);
        await queryRunner.query(`ALTER TABLE "session" ADD "sessionTime" TIMESTAMP NOT NULL`);
    }

}
