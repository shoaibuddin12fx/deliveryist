import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/authguards/auth.guard';
import { ChatListComponent } from './chat-list.component';
import { ChatComponent } from './chat/chat.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
    {
        path: 'chat',
        children: [
            {
                path: '',
                redirectTo: 'list'                    ,
                pathMatch: 'full'
            },
            {
                path: 'list',
                component: ListComponent
            },
            {
                path: 'room/:roomId',
                component: ChatComponent
            },
        ]
    },
    

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChatPageRoutingModule { }