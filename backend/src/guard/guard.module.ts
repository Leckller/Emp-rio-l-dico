import { Module } from "@nestjs/common";
import AuthGuard from "./auth.guard";
import AuthModule from "src/auth/auth.module";

@Module({
    exports:[AuthGuard],
    imports: [AuthModule],
    providers: [AuthGuard]
})
export default class GuardModule {}