import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemovedUserPhone1714494523341 implements MigrationInterface {
  name = 'RemovedUserPhone1714494523341';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "phone" text`);
  }
}
