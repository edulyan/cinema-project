import { MigrationInterface, QueryRunner } from "typeorm";

export class addsSlugCinemaMovie1680531418433 implements MigrationInterface {
    name = 'addsSlugCinemaMovie1680531418433'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ADD "slug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "UQ_454288774942b99d5127fb4173b" UNIQUE ("slug")`);
        await queryRunner.query(`ALTER TABLE "cinema" ADD "subway" text NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."cinema_slug_enum" AS ENUM('serpukhovskaya', 'taganskaya', 'lubyanka')`);
        await queryRunner.query(`ALTER TABLE "cinema" ADD "slug" "public"."cinema_slug_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cinema" ADD CONSTRAINT "UQ_1bb874db53f7371f06c09293211" UNIQUE ("slug")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cinema" DROP CONSTRAINT "UQ_1bb874db53f7371f06c09293211"`);
        await queryRunner.query(`ALTER TABLE "cinema" DROP COLUMN "slug"`);
        await queryRunner.query(`DROP TYPE "public"."cinema_slug_enum"`);
        await queryRunner.query(`ALTER TABLE "cinema" DROP COLUMN "subway"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "UQ_454288774942b99d5127fb4173b"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "slug"`);
    }

}
