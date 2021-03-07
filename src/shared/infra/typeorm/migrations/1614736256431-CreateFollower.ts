import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateFollower1614736256431 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'Follower',
              columns: [
                {
                  name: 'Id',
                  type: 'uuid',
                  isPrimary: true,
                  generationStrategy: 'uuid',
                  default: 'uuid_generate_v4()'
                },
                {
                  name: 'FkFollowerId',
                  type: 'uuid',
                },  
                {
                  name: 'FkFollowingId',
                  type: 'uuid',
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

          await queryRunner.createForeignKey('Follower', new TableForeignKey({
            name:'FollowerUser',
            columnNames: ['FkFollowerId'],
            referencedColumnNames: ['Id'],
            referencedTableName: 'User',
          }));

          await queryRunner.createForeignKey('Follower', new TableForeignKey({
            name:'FollowingUser',
            columnNames: ['FkFollowingId'],
            referencedColumnNames: ['Id'],
            referencedTableName: 'User',
          }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Follower');
    }

}
