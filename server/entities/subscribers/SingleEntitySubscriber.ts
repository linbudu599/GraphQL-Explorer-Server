import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from "typeorm";

import Account from "../Account";
import { encode } from "../../utils/bcrypt";

@EventSubscriber()
export class AccountSubscriber implements EntitySubscriberInterface<Account> {
  listenTo() {
    return Account;
  }

  beforeInsert(event: InsertEvent<Account>) {
    // console.log(`BEFORE Account INSERTED: `, event.entity);
    event.entity.accountPwd = encode(event.entity.accountPwd);
  }
}
