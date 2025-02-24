import { initServer } from "./config/app"
import { config } from "dotenv"
import { connect } from "mongoose"

config()
initServer()
connect()
