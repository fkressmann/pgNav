# pgNav
postgres client supporting reverse foreign key navigation

## API usage
The prefix for all endpoints is `/api`
### Connect
To connect to the service, call `/connect` with either a config_name or the following form encoded parameters:
- db_host
- db_port
- db_user
- db_pass
- db_name
The connection will be held active in the background while the App is running.

### Get Tables
Use `/tables` to get a list of all tables in your database

### Get Data
Call `/table/<string:table_name>` to get data. The following GET parameters are allowed:
- `limit` to limit the Amount of rows
- `offset` to shift the returned rows for pagination
- `filter_column` specify the column to filter. May only be used together with
- `by_value` to specify the value to filter for

### System
- Call `/system` to get the system state. Either 'up' or nothing :D
- Call `/system/shutdown` to stop the server