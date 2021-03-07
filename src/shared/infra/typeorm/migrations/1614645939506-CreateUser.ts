import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateUser1614645939506 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'User',
              columns: [
                {
                  name: 'Id',
                  type: 'uuid',
                  isPrimary: true,
                  generationStrategy: 'uuid',
                  default: 'uuid_generate_v4()'
                },
                {
                  name: 'Name',
                  type: 'varchar',
                },  
                {
                  name: 'Email',
                  type: 'varchar',
                  isUnique: true,
                },
                {
                    name: 'Password',
                    type: 'varchar',
                },
                {
                    name: 'Username',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'Avatar',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                  name: 'Created_at',
                  type: 'timestamp',
                  default: 'now()',
                },
                {
                  name: 'Updated_at',
                  type: 'timestamp',
                  default: 'now()',
                }
              ]
            })
          )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('User');
    }

}
