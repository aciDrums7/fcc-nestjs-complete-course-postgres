import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedUserPhone1714494322647 implements MigrationInterface {
  name = 'AddedUserPhone1714494322647';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "phone" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
  }
}
