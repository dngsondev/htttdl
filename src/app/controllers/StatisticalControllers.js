const e = require('express');
const statisticalCH = require('../models/statistical') //tung cua hang
const statisticalTL = require('../models/statisticalTL') // tung the loai cua 1 cua hang
// const statisticalAll = require('../models/statisticalAll') // tat ca cua hang
const statisticalTLAll = require('../models/statisticalTLAll') // 1 the loai cua tat ca cua hang
const inventoryCH = require('../models/inventory')

class StatisticalControllers {

    index(request, response) {
        const maCH = request.query.maCH;
        request.session.maCH = maCH;
        const tenCH = request.query.tenCH;
        request.session.tenCH = tenCH;
        statisticalCH(null, null, maCH, function(error, results, fields) {
            if (error) throw error;

            inventoryCH(maCH, function(inventoryError, inventory) {
                if (inventoryError) throw inventoryError;

                request.session.inventory = inventory
                console.log(inventory)
                response.render('statistical', {maCH: request.session.maCH, 
                    tenCH: request.session.tenCH, inventory: request.session.inventory});
            })
        })
    }
    
    statistical(request, response) {
        let maCH = request.session.maCH;
        let startDate = request.body.ngaybatdau; 
        let endDate = request.body.ngayketthuc;
        let maTL = request.body.theloai;
        let tkcuahang;
        console.log(maCH, startDate, endDate);
        if((!startDate && !endDate) && (request.session.startDate && request.session.endDate)){
            startDate = request.session.startDate
            endDate = request.session.endDate
            request.session.startDate = null
            request.session.endDate = null
        }
        if(startDate && endDate){
            if(maTL && maCH){
                statisticalTL(maCH, startDate, endDate, maTL, function(error, results, fields) {
                    if (error) throw error;
                    tkcuahang = results.map(result => result);
                    request.session.tkcuahang = tkcuahang;
                    request.session.maCH = maCH
                    request.session.startDate = startDate
                    request.session.endDate = endDate
                    console.log(startDate, endDate)
                    response.render('statistical', {maCH: request.session.maCH, tenCH: request.session.tenCH, 
                        startDate: request.session.startDate,endDate: request.session.endDate,
                        tkcuahang: request.session.tkcuahang, inventory: request.session.inventory});
                })
            }else if(maCH && !maTL){
                statisticalCH(maCH, startDate, endDate, function(error, results, fields) {
                    if (error) throw error;
                    tkcuahang = results.map(result => result);
                    request.session.tkcuahang = tkcuahang;
                    request.session.maCH = maCH
                    request.session.startDate = startDate
                    request.session.endDate = endDate
                    response.render('statistical', {maCH: request.session.maCH, tenCH: request.session.tenCH, 
                        startDate: request.session.startDate, endDate: request.session.endDate,
                        tkcuahang: request.session.tkcuahang, inventory: request.session.inventory});
                })
            }else if(maTL && !maCH){
                statisticalTLAll(startDate, endDate, maTL, function(error, results, fields) {
                    if (error) throw error;
                    tkcuahang = results.map(result => result);
                    request.session.tkcuahang = tkcuahang;
                    request.session.startDate = startDate
                    request.session.endDate = endDate
                    response.render('statistical', {maCH: request.session.maCH, tenCH: request.session.tenCH, 
                        startDate: request.session.startDate, endDate: request.session.endDate,
                        tkcuahang: request.session.tkcuahang, inventory: request.session.inventory});
                })
            }
            // else{
            //     statisticalAll(function(error, results, fields) {
            //         if (error) throw error;
            //         console.log(results)
            //         // tkcuahang = results.map(result => result);
            //         // request.session.tkcuahang = tkcuahang;
            //         request.session.startDate = startDate
            //         request.session.endDate = endDate
            //         response.render('statistical', {startDate: request.session.startDate,
            //             endDate: request.session.endDate, stores: results});
            //     })
            // }
        }
    }
}

module.exports = new StatisticalControllers