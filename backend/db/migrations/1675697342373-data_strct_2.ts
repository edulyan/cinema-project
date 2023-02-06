import { MigrationInterface, QueryRunner } from "typeorm";

export class dataStrct21675697342373 implements MigrationInterface {
    name = 'dataStrct21675697342373'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sessionTime" TIMESTAMP NOT NULL, "roomId" uuid, CONSTRAINT "REL_6bfcd8b79900d13de31fc4098f" UNIQUE ("roomId"), CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "number" integer NOT NULL, "room_seats" polygon array NOT NULL, "cinemaId" uuid, "sessionId" uuid, CONSTRAINT "REL_22b368ef0e572196e67f6c368d" UNIQUE ("sessionId"), CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schedule" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "cinemaId" uuid, CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cinema" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "address" character varying NOT NULL, CONSTRAINT "PK_65912fd9911f64e56eadf654912" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TYPE "public"."user_role_enum" RENAME TO "user_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'user', 'ghost')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" TYPE "public"."user_role_enum" USING "role"::"text"::"public"."user_role_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user'`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_6bfcd8b79900d13de31fc4098f2" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_857a4a5a42a30bf2b37af33dcbe" FOREIGN KEY ("cinemaId") REFERENCES "cinema"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_22b368ef0e572196e67f6c368d3" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_da365cb1292c90c0d12a1dc13e3" FOREIGN KEY ("cinemaId") REFERENCES "cinema"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_da365cb1292c90c0d12a1dc13e3"`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_22b368ef0e572196e67f6c368d3"`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_857a4a5a42a30bf2b37af33dcbe"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_6bfcd8b79900d13de31fc4098f2"`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum_old" AS ENUM('admin', 'user')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" TYPE "public"."user_role_enum_old" USING "role"::"text"::"public"."user_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user'`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_role_enum_old" RENAME TO "user_role_enum"`);
        await queryRunner.query(`DROP TABLE "cinema"`);
        await queryRunner.query(`DROP TABLE "schedule"`);
        await queryRunner.query(`DROP TABLE "room"`);
        await queryRunner.query(`DROP TABLE "session"`);
    }

}
