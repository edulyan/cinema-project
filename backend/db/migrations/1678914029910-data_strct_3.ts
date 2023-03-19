import { MigrationInterface, QueryRunner } from "typeorm";

export class dataStrct31678914029910 implements MigrationInterface {
    name = 'dataStrct31678914029910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_22b368ef0e572196e67f6c368d3"`);
        await queryRunner.query(`CREATE TYPE "public"."movie_agerating_enum" AS ENUM('0+', '6+', '12+', '16+', '18+')`);
        await queryRunner.query(`CREATE TYPE "public"."movie_countries_enum" AS ENUM('Россия', 'США', 'СССР', 'Франция', 'Италия', 'Испания', 'Великобритания', 'Германия', 'Южная Корея', 'Япония', 'Австралия', 'Австрия', 'Бельгия', 'Бразилия', 'Гонконг', 'Греция', 'Египет', 'Израиль', 'Индия', 'Канада', 'Китай', 'Лихтенштейн', 'Нидерланды', 'Норвегия', 'ОАЭ', 'Польша', 'Португалия', 'Таиланд', 'Турция', 'Украина', 'Филиппины', 'Швеция', 'Швейцария', 'ЮАР')`);
        await queryRunner.query(`CREATE TYPE "public"."movie_genre_enum" AS ENUM('боевик', 'комедия', 'драма', 'фэнтэзи', 'ужасы', 'мелодрама', 'триллер', 'фантастика', 'вестерн', 'детектив')`);
        await queryRunner.query(`CREATE TABLE "movie" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "director" text NOT NULL, "year" integer NOT NULL, "ageRating" "public"."movie_agerating_enum" NOT NULL, "runTime" character varying NOT NULL, "averageRating" double precision NOT NULL, "image" character varying NOT NULL, "trailer" character varying, "countries" "public"."movie_countries_enum" array NOT NULL, "genre" "public"."movie_genre_enum" array NOT NULL, "actors" text NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "room_seats"`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "REL_22b368ef0e572196e67f6c368d"`);
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "sessionId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "session" ADD "room_seats" polygon array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD "movieId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD "passwordHash" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_6bfcd8b79900d13de31fc4098f2"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "REL_6bfcd8b79900d13de31fc4098f"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdDate"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedDate"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_6bfcd8b79900d13de31fc4098f2" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_e3d8315fb65a948f2d4f135f7df" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_e3d8315fb65a948f2d4f135f7df"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_6bfcd8b79900d13de31fc4098f2"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedDate"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdDate"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "REL_6bfcd8b79900d13de31fc4098f" UNIQUE ("roomId")`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_6bfcd8b79900d13de31fc4098f2" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "passwordHash"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "movieId"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "room_seats"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "room" ADD "sessionId" uuid`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "REL_22b368ef0e572196e67f6c368d" UNIQUE ("sessionId")`);
        await queryRunner.query(`ALTER TABLE "room" ADD "room_seats" polygon array NOT NULL`);
        await queryRunner.query(`DROP TABLE "movie"`);
        await queryRunner.query(`DROP TYPE "public"."movie_genre_enum"`);
        await queryRunner.query(`DROP TYPE "public"."movie_countries_enum"`);
        await queryRunner.query(`DROP TYPE "public"."movie_agerating_enum"`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_22b368ef0e572196e67f6c368d3" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
