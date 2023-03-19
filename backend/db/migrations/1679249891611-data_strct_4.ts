import { MigrationInterface, QueryRunner } from "typeorm";

export class dataStrct41679249891611 implements MigrationInterface {
    name = 'dataStrct41679249891611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_922e8c1d396025973ec81e2a402"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_da365cb1292c90c0d12a1dc13e3"`);
        await queryRunner.query(`CREATE TABLE "ticket" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "buyerId" uuid, "sessionId" uuid, CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "REL_922e8c1d396025973ec81e2a40"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "walletId"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "runTime"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "averageRating"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "duration" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "room_seats"`);
        await queryRunner.query(`ALTER TABLE "session" ADD "room_seats" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "image" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_53ff034c6b808c264b0e2e15c08" FOREIGN KEY ("buyerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_f899125e17b829a124a3d66e4a6" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_da365cb1292c90c0d12a1dc13e3" FOREIGN KEY ("cinemaId") REFERENCES "cinema"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_da365cb1292c90c0d12a1dc13e3"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_f899125e17b829a124a3d66e4a6"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_53ff034c6b808c264b0e2e15c08"`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "image" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "room_seats"`);
        await queryRunner.query(`ALTER TABLE "session" ADD "room_seats" polygon array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "duration"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "averageRating" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "runTime" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "walletId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "REL_922e8c1d396025973ec81e2a40" UNIQUE ("walletId")`);
        await queryRunner.query(`DROP TABLE "ticket"`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_da365cb1292c90c0d12a1dc13e3" FOREIGN KEY ("cinemaId") REFERENCES "cinema"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_922e8c1d396025973ec81e2a402" FOREIGN KEY ("walletId") REFERENCES "wallet"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
