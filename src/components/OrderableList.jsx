import React from 'react';
import '../styles/css/OrderableList.css';
/**
 * 
 * Wow, took a lot of searching to find a way to get jQuery and jQuery-ui imported...
 * https://github.com/facebook/create-react-app/issues/2337#issuecomment-303717356
 * 
 */
const $ = require('jquery')
window.jQuery = $;
require('jquery-ui/ui/version');
require('jquery-ui/ui/plugin');
require('jquery-ui/ui/widget');
require('jquery-ui/ui/widgets/mouse');
require('jquery-ui/ui/widgets/sortable');


class OrderableList extends React.Component {
    constructor(props) {
        super(props);
        this.defaultItems = [1,2,3];
        this.items = props.items || this.defaultItems;
    }

    componentDidMount() {
        /**
         * https://codepen.io/chriscoyier/pen/BvcKq
         */

        $(".slide").each(function (i) {
            var item = $(this);
            var item_clone = item.clone();
            item.data("clone", item_clone);
            var position = item.position();
            item_clone
                .css({
                    left: position.left,
                    top: position.top,
                    visibility: "hidden"
                })
                .attr("data-pos", i + 1);

            $("#cloned-slides").append(item_clone);
        });

        $(".all-slides").sortable({

            axis: "y",
            revert: true,
            scroll: false,
            placeholder: "sortable-placeholder",
            cursor: "move",

            start: function (e, ui) {
                console.log('** Calling start **');
                ui.helper.addClass("exclude-me");
                $(".all-slides .slide:not(.exclude-me)")
                    .css("visibility", "hidden");
                ui.helper.data("clone").hide();
                $(".cloned-slides .slide").css("visibility", "visible");
            },

            stop: function (e, ui) {
                console.log('** Calling stop **');
                $(".all-slides .slide.exclude-me").each(function () {
                    var item = $(this);
                    var clone = item.data("clone");
                    var position = item.position();

                    clone.css("left", position.left);
                    clone.css("top", position.top);
                    clone.show();

                    item.removeClass("exclude-me");
                });

                $(".all-slides .slide").each(function () {
                    var item = $(this);
                    var clone = item.data("clone");

                    clone.attr("data-pos", item.index());
                });

                $(".all-slides .slide").css("visibility", "visible");
                $(".cloned-slides .slide").css("visibility", "hidden");
            },

            change: function (e, ui) {
                console.log('** Calling change **');
                $(".all-slides .slide:not(.exclude-me)").each(function () {
                    var item = $(this);
                    var clone = item.data("clone");
                    clone.stop(true, false);
                    var position = item.position();
                    clone.animate({
                        left: position.left,
                        top: position.top
                    }, 200);
                });
            }

        });

    }

    render() {
        if (!this.items || this.items.length === 0) return null;
        return (
            <div id='orderableList'>
                <div className='all-slides'>
                    {this.items.map(item =>
                        <div className='slide' key={item}>
                            {item}
                        </div>
                    )}
                </div>
                <div id='cloned-slides' className='cloned-slides'></div>
            </div>
        );
    }
}


export default OrderableList;