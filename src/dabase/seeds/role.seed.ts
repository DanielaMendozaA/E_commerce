import { DataSource } from "typeorm";
import { Seeder } from 'typeorm-extension'
import { Role } from "src/roles/entities/role.entity";
import { Logger } from "@nestjs/common";

const logger = new Logger('RoleSeed');


export default class RoleSeed implements Seeder {
 
    public async run(dataSource: DataSource): Promise <void>{

        const roleRepository = dataSource.getRepository(Role);

        const rolesData = [
            {name: 'admin'},
            {name: 'reg_user'},
        ]


        for(const role of rolesData){
            const rolExists = await roleRepository.findOne({where: {name: role.name}});
            if(!rolExists){
                const newRole = roleRepository.create(role);
                await roleRepository.save(newRole);
                logger.log(`Role ${role.name} created`);
            }else{
                logger.log(`Role ${role.name} already exists`);
            }
        }
        
    }



}