<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Models\Goods;
use App\Models\Shipment;
use Carbon\Carbon;
use Illuminate\Support\Str;

class ScheduleShipment extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:schedule-shipment';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        $today = Carbon::today();

        $shipment = Shipment::where('shipment_date',$today)
                            ->orwhere('status','pending')
                            ->first();
        
        if(!$shipment) {                   
            $this->info('No scheduled shipment for today');
            return;
        }

        $unshippedGoods = Goods::where('status','unshipped')->get();

        if($unshippedGoods->isEmpty()) {
            $this->info('No unshipped goods found');
            return;
        }
        
        foreach($unshippedGoods as $goods) {
            $goods->shipment_id = $shipment->id;
            $goods->status = 'shipped';
            $goods->save();
        }

        $shipment->status = 'In-transit';
        $shipment->save();

        $this->info('Goods assigned to shipment ID: ' . $shipment->id . ' and shipment marked as In Transit.');
    }
}
