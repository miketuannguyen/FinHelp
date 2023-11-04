import { Injectable } from '@nestjs/common';
import { CreateIEDTO, IEDTO, IETagDTO } from 'src/dtos';
import { IEEntity, IETagEntity } from 'src/entities';
import { BaseService } from 'src/includes';
import { IERepository } from 'src/repository';
import { Helpers, mapper } from 'src/utils';
import { DataSource } from 'typeorm';

@Injectable()
export class IEService extends BaseService {
    /** Constructor */
    constructor(private readonly _ieRepo: IERepository, private readonly _dataSource: DataSource) {
        super();
    }

    /**
     * Batch create i&e and link with tag
     * @param ieDTOList - i&e list with tag id list
     * @returns newly created i&e list with tag id list
     */
    public async batchCreate(ieDTOList: CreateIEDTO[]): Promise<CreateIEDTO[]> {
        if (!Helpers.isFilledArray(ieDTOList)) return [];

        const queryRunner = this._dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        const result: CreateIEDTO[] = [];
        try {
            for (const ieDTO of ieDTOList) {
                const ieEntity = mapper.map(ieDTO, IEDTO, IEEntity);
                const ieEntityRes = await queryRunner.manager.save(ieEntity);

                const createIEDTO: CreateIEDTO = {
                    ...ieDTO,
                    tag_id_list: []
                };

                for (const tagId of ieDTO.tag_id_list) {
                    const ieTagDTO = new IETagDTO();
                    ieTagDTO.ie_id = ieEntityRes.id;
                    ieTagDTO.tag_id = tagId;
                    const ieTagEntity = mapper.map(ieTagDTO, IETagDTO, IETagEntity);
                    await queryRunner.manager.save(ieTagEntity);

                    createIEDTO.tag_id_list.push(tagId);
                }

                result.push(createIEDTO);
            }

            await queryRunner.commitTransaction();
            return result;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }
}
