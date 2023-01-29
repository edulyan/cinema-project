import { MigrationInterface, QueryRunner } from "typeorm";

export class init1675019691109 implements MigrationInterface {
    name = 'init1675019691109'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "wallet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "balance" integer NOT NULL DEFAULT '0', "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isSubscribed" boolean NOT NULL DEFAULT false, "next_payment_date" character varying, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "walletId" uuid, CONSTRAINT "REL_922e8c1d396025973ec81e2a40" UNIQUE ("walletId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_922e8c1d396025973ec81e2a402" FOREIGN KEY ("walletId") REFERENCES "wallet"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_922e8c1d396025973ec81e2a402"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "wallet"`);
    }

}
