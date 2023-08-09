import { MigrationInterface, QueryRunner } from "typeorm";

export class addimgVertMovie1683300992452 implements MigrationInterface {
    name = 'addimgVertMovie1683300992452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ADD "imgVert" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "imgVert"`);
    }

}
